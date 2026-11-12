"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { safeReturnPath } from "@/lib/panel";
import { usePanel } from "./panel-provider";
import { inputClass, panelCard, PanelHeading, PanelNotice, primaryButton } from "./panel-ui";

export function AuthForm({ register = false }: { register?: boolean }) {
  const { data, mutate } = usePanel();
  const router = useRouter();
  const params = useSearchParams();
  const returnPath = safeReturnPath(params.get("powrot"));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const title = register ? "Załóż konto" : "Zaloguj się";
  const signedIn = Boolean(data?.account);

  useEffect(() => {
    if (signedIn) router.replace(returnPath);
  }, [signedIn, returnPath, router]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    try {
      await mutate(register
        ? { action: "register", name: String(form.get("name")), email, password, accepted: form.has("accepted") }
        : { action: "login", email, password });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Spróbuj ponownie.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <PanelHeading title={title}>
        {register ? "Użyj przykładowych danych, aby wypróbować panel VELORA." : "Sprawdź swoje rezerwacje i zapisane wycieczki."}
      </PanelHeading>
      <form className={panelCard + " space-y-5"} onSubmit={submit}>
        {register && (
          <label className="grid gap-1.5 text-sm font-semibold">
            Nazwa wyświetlana
            <input className={inputClass} name="name" autoComplete="nickname" required minLength={2} maxLength={80} />
          </label>
        )}
        <label className="grid gap-1.5 text-sm font-semibold">
          Adres e-mail
          <input className={inputClass} name="email" type="email" autoComplete="email" required maxLength={254} placeholder="podroznik@example.com" />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold">
          Hasło
          <input className={inputClass} name="password" type="password" autoComplete={register ? "new-password" : "current-password"} required minLength={register ? 8 : undefined} maxLength={128} />
          {register && <span className="text-xs font-normal text-gray-500">Minimum 8 znaków.</span>}
        </label>
        {register && (
          <label className="flex items-start gap-2 text-sm leading-6 text-gray-700">
            <input name="accepted" type="checkbox" required className="mt-1.5" />
            <span>Akceptuję <Link href="/regulamin" target="_blank" className="font-medium text-blue-950 underline">regulamin demonstracji</Link> i zapoznałem się z <Link href="/polityka-prywatności" target="_blank" className="font-medium text-blue-950 underline">polityką prywatności</Link>.</span>
          </label>
        )}
        {error && <PanelNotice error>{error}</PanelNotice>}
        <button type="submit" disabled={busy || signedIn} className={primaryButton + " w-full"}>
          {busy || signedIn ? "Proszę czekać…" : title}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-gray-600">
        {register ? "Masz już konto?" : "Nie masz jeszcze konta?"}{" "}
        <Link
          href={{ pathname: register ? "/panel/logowanie" : "/panel/rejestracja", query: { powrot: returnPath } }}
          className="font-semibold text-blue-950 hover:underline"
        >
          {register ? "Zaloguj się" : "Załóż konto"}
        </Link>
      </p>
    </main>
  );
}
