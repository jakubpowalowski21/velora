import { type NextRequest, NextResponse } from "next/server";
import { emptyPanel } from "@/lib/panel";
import {
  authenticate, cookieOptions, endSession, getAccount, PanelError, readPanel, sessionCookie, updatePanel,
} from "@/lib/panel-store";

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

function clearSession() {
  const response = json(emptyPanel);
  response.cookies.set(sessionCookie, "", { ...cookieOptions, maxAge: 0 });
  return response;
}

export function GET(request: NextRequest) {
  try {
    return json(readPanel(getAccount(request.cookies.get(sessionCookie)?.value)));
  } catch (error) {
    return handleError(error);
  }
}

function handleError(error: unknown) {
  if (error instanceof PanelError) return json({ error: error.message }, error.status);
  console.error("VELORA panel", error);
  return json({ error: "Operacja się nie powiodła. Spróbuj ponownie." }, 500);
}

export async function POST(request: NextRequest) {
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return json({ error: "Nieprawidłowy format danych." }, 415);
  }

  try {
    const body: unknown = await request.json().catch(() => null);
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      throw new PanelError("Nieprawidłowe dane.");
    }
    const input = body as Record<string, unknown>;
    const token = request.cookies.get(sessionCookie)?.value;

    if (input.action === "login" || input.action === "register") {
      const session = await authenticate(input, token);
      const response = json(readPanel(session.account));
      response.cookies.set(sessionCookie, session.token, cookieOptions);
      return response;
    }
    if (input.action === "logout") {
      endSession(token);
      return clearSession();
    }

    const account = getAccount(token);
    if (!token || !account) {
      return json({ error: "Zaloguj się, aby kontynuować." }, 401);
    }
    await updatePanel(account, token, input);
    return input.action === "delete" ? clearSession() : json(readPanel(account));
  } catch (error) {
    return handleError(error);
  }
}
