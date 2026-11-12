export type Account = {
  id: string;
  name: string;
  email: string;
};

export type BookingStatus = "pending" | "declined" | "paid" | "cancelled";

export type Booking = {
  id: string;
  tourSlug: string;
  tourName: string;
  date: string;
  participants: number;
  total: number;
  status: BookingStatus;
};

export type PanelData = {
  account: Account | null;
  favorites: number[];
  bookings: Booking[];
};

export type PanelAction =
  | { action: "register"; name: string; email: string; password: string; accepted: boolean }
  | { action: "login"; email: string; password: string }
  | { action: "logout" }
  | { action: "rename"; name: string }
  | { action: "password"; currentPassword: string; password: string }
  | { action: "delete"; password: string }
  | { action: "favorite"; tourId: number; saved: boolean }
  | { action: "book"; id: string; slug: string; date: string; participants: number }
  | { action: "pay"; id: string; result: "paid" | "declined" }
  | { action: "cancel"; id: string };

export const emptyPanel: PanelData = { account: null, favorites: [], bookings: [] };

export const bookingLabels: Record<BookingStatus, string> = {
  pending: "Oczekuje na płatność",
  declined: "Płatność odrzucona",
  paid: "Potwierdzona",
  cancelled: "Anulowana",
};

export function formatPrice(total: number) {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(total);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    dateStyle: "long",
    timeZone: "Europe/Warsaw",
  }).format(new Date(date));
}

export function todayInPoland() {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Warsaw" }).format(
    new Date(),
  );
}

export function safeReturnPath(path: string | null) {
  if (!path?.startsWith("/") || /^\/[/\\]/.test(path) || /[\\\s]/.test(path)) {
    return "/panel";
  }

  const origin = "https://velora.example";
  const url = new URL(path, origin);
  if (url.origin !== origin || url.pathname.startsWith("//") ||
      /^\/panel\/(logowanie|rejestracja)\/?$/.test(url.pathname)) {
    return "/panel";
  }
  return url.pathname + url.search + url.hash;
}

export function loginPath(returnPath: string) {
  return "/panel/logowanie?powrot=" + encodeURIComponent(safeReturnPath(returnPath));
}
