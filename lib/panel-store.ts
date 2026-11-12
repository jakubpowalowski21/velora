import { createHash, randomBytes, randomUUID, scrypt, timingSafeEqual } from "node:crypto";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { promisify } from "node:util";
import tours from "@/data/wycieczki.json";
import { emptyPanel, todayInPoland, type Account, type Booking, type PanelData } from "@/lib/panel";

type SqlValue = string | number;
type Statement = {
  get(...params: SqlValue[]): unknown;
  all(...params: SqlValue[]): unknown[];
  run(...params: SqlValue[]): { changes: number | bigint };
};
type Database = {
  exec(sql: string): void;
  prepare(sql: string): Statement;
};
type StoredAccount = Account & { password: string };

const derivePassword = promisify(scrypt);
const sessionLifetime = 7 * 24 * 60 * 60;
export const sessionCookie = "velora-session";
export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: sessionLifetime,
};

let database: Database | undefined;

function store() {
  if (database) return database;

  const path = resolve(process.env.VELORA_DB_PATH || ".velora/panel.sqlite");
  mkdirSync(dirname(path), { recursive: true });
  // The project's Node 20 type definitions predate node:sqlite.
  const { DatabaseSync } = process.getBuiltinModule("node:sqlite") as {
    DatabaseSync: new (filename: string) => Database;
  };
  const connection = new DatabaseSync(path);
  connection.exec("PRAGMA busy_timeout = 5000; PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;");
  connection.exec(
    `
      CREATE TABLE IF NOT EXISTS accounts (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS sessions (
        token TEXT PRIMARY KEY,
        account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
        expires INTEGER NOT NULL
      );
      CREATE TABLE IF NOT EXISTS favorites (
        account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
        tour_id INTEGER NOT NULL,
        PRIMARY KEY (account_id, tour_id)
      );
      CREATE TABLE IF NOT EXISTS bookings (
        id TEXT NOT NULL,
        account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
        tourSlug TEXT NOT NULL,
        tourName TEXT NOT NULL,
        date TEXT NOT NULL,
        participants INTEGER NOT NULL,
        total INTEGER NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('pending', 'declined', 'paid', 'cancelled')),
        created INTEGER NOT NULL,
        PRIMARY KEY (account_id, id)
      );
      CREATE INDEX IF NOT EXISTS booking_seats ON bookings(tourSlug, date, status);
    `,
  );
  database = connection;
  return connection;
}

function transaction(work: (connection: Database) => void) {
  const connection = store();
  connection.exec("BEGIN IMMEDIATE");
  try {
    work(connection);
    connection.exec("COMMIT");
  } catch (error) {
    connection.exec("ROLLBACK");
    throw error;
  }
}

export class PanelError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
  }
}

function tokenDigest(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function getAccount(token: string | undefined): Account | null {
  if (!token) return null;

  const account = store().prepare(
    "SELECT accounts.id, name, email FROM accounts JOIN sessions ON sessions.account_id = accounts.id " +
    "WHERE sessions.token = ? AND sessions.expires > ?",
  ).get(tokenDigest(token), Date.now()) as Account | undefined;
  return account ?? null;
}

function startSession(accountId: string, previousToken: string | undefined) {
  const token = randomBytes(32).toString("hex");
  const connection = store();
  connection.prepare("DELETE FROM sessions WHERE expires <= ?").run(Date.now());
  endSession(previousToken);
  connection.prepare("INSERT INTO sessions VALUES (?, ?, ?)").run(
    tokenDigest(token), accountId, Date.now() + sessionLifetime * 1000,
  );
  return token;
}

export function endSession(token: string | undefined) {
  if (token) store().prepare("DELETE FROM sessions WHERE token = ?").run(tokenDigest(token));
}

export function readPanel(account: Account | null): PanelData {
  if (!account) return emptyPanel;

  const connection = store();
  const favorites = connection.prepare("SELECT tour_id FROM favorites WHERE account_id = ?")
    .all(account.id) as { tour_id: number }[];
  const bookings = connection.prepare(
    "SELECT id, tourSlug, tourName, date, participants, total, status FROM bookings " +
    "WHERE account_id = ? ORDER BY created DESC, id",
  ).all(account.id) as Booking[];
  return { account, favorites: favorites.map((row) => row.tour_id), bookings };
}

function validName(value: unknown) {
  const name = typeof value === "string" ? value.trim() : "";
  if (name.length < 2 || name.length > 80) {
    throw new PanelError("Podaj nazwę o długości od 2 do 80 znaków.");
  }
  return name;
}

function validPassword(value: unknown) {
  if (typeof value !== "string" || value.length < 8 || value.length > 128) {
    throw new PanelError("Hasło musi mieć od 8 do 128 znaków.");
  }
  return value;
}

function normalizeEmail(value: unknown) {
  const email = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new PanelError("Podaj poprawny adres e-mail.");
  }
  return email;
}

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = await derivePassword(password, salt, 64) as Buffer;
  return salt + ":" + hash.toString("hex");
}

async function matchesPassword(value: unknown, stored: string | undefined) {
  if (typeof value !== "string" || value.length > 128) return false;
  const [salt, hex] = stored?.split(":") ?? ["velora-demo", "00".repeat(64)];
  const hash = await derivePassword(value, salt, 64) as Buffer;
  return timingSafeEqual(hash, Buffer.from(hex, "hex")) && Boolean(stored);
}

export async function authenticate(
  input: Record<string, unknown>,
  previousToken: string | undefined,
) {
  const email = normalizeEmail(input.email);
  const connection = store();
  if (input.action === "register") {
    if (input.accepted !== true) throw new PanelError("Zaakceptuj regulamin demonstracji.");
    const account = { id: randomUUID(), name: validName(input.name), email };
    const hash = await hashPassword(validPassword(input.password));
    const inserted = connection.prepare(
      "INSERT INTO accounts VALUES (?, ?, ?, ?) ON CONFLICT(email) DO NOTHING",
    ).run(account.id, account.name, account.email, hash);
    if (!inserted.changes) throw new PanelError("Konto z tym adresem e-mail już istnieje.", 409);
    return { account, token: startSession(account.id, previousToken) };
  }

  const stored = connection.prepare("SELECT * FROM accounts WHERE email = ?")
    .get(email) as StoredAccount | undefined;
  if (!(await matchesPassword(input.password, stored?.password)) || !stored) {
    throw new PanelError("Adres e-mail lub hasło jest nieprawidłowe.", 401);
  }
  const { id, name } = stored;
  return { account: { id, name, email }, token: startSession(id, previousToken) };
}

function bookingId(value: unknown) {
  if (typeof value !== "string" || !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(value)) {
    throw new PanelError("Nieprawidłowy numer rezerwacji.");
  }
  return value;
}

function checkSeats(connection: Database, slug: string, date: string, participants: number, limit: number) {
  const { used } = connection.prepare(
    "SELECT COALESCE(SUM(participants), 0) AS used FROM bookings WHERE tourSlug = ? AND date = ? AND status = 'paid'",
  ).get(slug, date) as { used: number };
  if (used + participants > limit) {
    throw new PanelError("Na ten termin pozostało za mało wolnych miejsc.", 409);
  }
}

export async function updatePanel(account: Account, token: string, input: Record<string, unknown>) {
  const connection = store();
  switch (input.action) {
    case "rename":
      account.name = validName(input.name);
      connection.prepare("UPDATE accounts SET name = ? WHERE id = ?").run(account.name, account.id);
      return;
    case "password":
    case "delete": {
      const stored = connection.prepare("SELECT password FROM accounts WHERE id = ?")
        .get(account.id) as Pick<StoredAccount, "password"> | undefined;
      const currentPassword = input.action === "delete" ? input.password : input.currentPassword;
      if (!(await matchesPassword(currentPassword, stored?.password)) || !stored) {
        throw new PanelError("Aktualne hasło jest nieprawidłowe.");
      }
      if (input.action === "delete") {
        const deleted = connection.prepare("DELETE FROM accounts WHERE id = ? AND password = ?")
          .run(account.id, stored.password);
        if (!deleted.changes) throw new PanelError("Dane konta zostały zmienione w innej sesji.", 409);
        return;
      }
      const hash = await hashPassword(validPassword(input.password));
      transaction((db) => {
        const changed = db.prepare("UPDATE accounts SET password = ? WHERE id = ? AND password = ?")
          .run(hash, account.id, stored.password);
        if (!changed.changes) throw new PanelError("Hasło zostało zmienione w innej sesji.", 409);
        db.prepare("DELETE FROM sessions WHERE account_id = ? AND token != ?")
          .run(account.id, tokenDigest(token));
      });
      return;
    }
    case "favorite": {
      const tour = tours.find(({ id }) => id === input.tourId);
      if (!tour || typeof input.saved !== "boolean") throw new PanelError("Nieprawidłowa wycieczka.");
      const sql = input.saved
        ? "INSERT OR IGNORE INTO favorites VALUES (?, ?)"
        : "DELETE FROM favorites WHERE account_id = ? AND tour_id = ?";
      connection.prepare(sql).run(account.id, tour.id);
      return;
    }
    case "book": {
      const id = bookingId(input.id);
      const tour = tours.find(({ slug }) => slug === input.slug);
      const { date, participants } = input;
      if (!tour || typeof date !== "string" || !tour.terminy.includes(date) || date < todayInPoland()) {
        throw new PanelError("Wybierz dostępny termin wycieczki.");
      }
      if (typeof participants !== "number" || !Number.isInteger(participants) ||
          participants < 1 || participants > tour.limitMiejsc) {
        throw new PanelError("Wybierz prawidłową liczbę uczestników.");
      }
      transaction((db) => {
        if (db.prepare("SELECT id FROM bookings WHERE account_id = ? AND id = ?").get(account.id, id)) return;
        checkSeats(db, tour.slug, date, participants, tour.limitMiejsc);
        db.prepare("INSERT INTO bookings VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?)")
          .run(id, account.id, tour.slug, tour.nazwa, date, participants, participants * tour.cenaPLN, Date.now());
      });
      return;
    }
    case "pay":
    case "cancel": {
      const id = bookingId(input.id);
      const result = input.result;
      if (input.action === "pay" && result !== "paid" && result !== "declined") {
        throw new PanelError("Nieprawidłowy wynik płatności.");
      }
      const status = input.action === "cancel" ? "cancelled" : result as "paid" | "declined";
      transaction((db) => {
        const booking = db.prepare("SELECT * FROM bookings WHERE account_id = ? AND id = ?")
          .get(account.id, id) as Booking | undefined;
        if (!booking) throw new PanelError("Nie znaleziono rezerwacji.", 404);
        if (booking.status === status) return;
        if (booking.status === "cancelled" || (booking.status === "paid" && status !== "cancelled")) {
          throw new PanelError("Status tej rezerwacji został już zmieniony.", 409);
        }
        if (status === "paid") {
          const tour = tours.find(({ slug }) => slug === booking.tourSlug);
          if (!tour || booking.date < todayInPoland()) {
            throw new PanelError("Termin tej rezerwacji jest już niedostępny.", 409);
          }
          checkSeats(db, tour.slug, booking.date, booking.participants, tour.limitMiejsc);
        }
        db.prepare("UPDATE bookings SET status = ? WHERE account_id = ? AND id = ?").run(status, account.id, id);
      });
      return;
    }
    default:
      throw new PanelError("Nieznana operacja.");
  }
}
