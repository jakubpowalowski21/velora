"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CalendarDays, Heart, LayoutDashboard, LogOut, UserRound } from "lucide-react";
import { loginPath } from "@/lib/panel";
import { usePanel } from "./panel-provider";
import { PanelNotice, secondaryButton } from "./panel-ui";

const navigation = [
  { href: "/panel", label: "Przegląd", Icon: LayoutDashboard },
  { href: "/panel/moje-rezerwacje", label: "Moje rezerwacje", Icon: CalendarDays },
  { href: "/panel/ulubione", label: "Ulubione", Icon: Heart },
  { href: "/panel/profil", label: "Moje konto", Icon: UserRound },
];

export default function PanelLayout({ children }: { children: ReactNode }) {
  const { data, loadError, refresh, mutate } = usePanel();
  const router = useRouter();
  const pathname = usePathname();
  const [leaving, setLeaving] = useState(false);
  const [error, setError] = useState("");
  const account = data?.account;

  useEffect(() => {
    if (data && !account && !leaving) {
      router.replace(loginPath(pathname + window.location.search));
    }
  }, [data, account, leaving, router, pathname]);

  async function logout() {
    setLeaving(true);
    setError("");
    try {
      await mutate({ action: "logout" });
      router.replace("/panel/logowanie");
    } catch {
      setError("Nie udało się wylogować. Spróbuj ponownie.");
      setLeaving(false);
    }
  }

  if (!account) {
    return (
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">
        {loadError ? (
          <div className="space-y-4">
            <PanelNotice error>Nie udało się sprawdzić sesji.</PanelNotice>
            <button className={secondaryButton} onClick={() => void refresh()}>Spróbuj ponownie</button>
          </div>
        ) : <p role="status" className="text-gray-600">{data ? "Przechodzenie do logowania…" : "Ładowanie panelu…"}</p>}
      </main>
    );
  }

  return (
    <main className="mx-auto grid w-full max-w-7xl flex-1 items-start gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[230px_minmax(0,1fr)] lg:px-8 lg:py-12">
      <aside className="rounded-2xl border border-gray-200 p-4 lg:sticky lg:top-24">
        <p className="mb-3 px-3 text-sm font-semibold text-[#143B47]">Panel klienta</p>
        <nav aria-label="Panel klienta" className="grid grid-cols-2 gap-1 lg:grid-cols-1">
          {navigation.map(({ href, label, Icon }) => {
            const active = pathname === href || (href !== "/panel" && pathname.startsWith(href + "/"));
            return (
              <Link key={href} href={href} aria-current={active ? "page" : undefined}
                className={"flex min-h-11 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium " + (active ? "bg-[#143B47] text-white" : "text-gray-700 hover:bg-gray-100")}>
                <Icon size={17} className="shrink-0" aria-hidden="true" />
                {label}
              </Link>
            );
          })}
        </nav>
        <button type="button" disabled={leaving} onClick={logout} className="mt-3 flex min-h-11 w-full items-center gap-2 rounded-lg border-t border-gray-100 px-3 pt-2 text-left text-sm font-medium text-gray-600 hover:text-blue-950">
          <LogOut size={17} aria-hidden="true" />
          {leaving ? "Wylogowywanie…" : "Wyloguj się"}
        </button>
        {error && <PanelNotice error>{error}</PanelNotice>}
      </aside>
      <div className="min-w-0">{children}</div>
    </main>
  );
}
