"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Heart, UserRound } from "lucide-react";
import { usePanel } from "./panel-provider";
import { PanelHeading, panelCard, primaryButton } from "./panel-ui";

export function Dashboard() {
  const { data } = usePanel();
  if (!data?.account) return null;

  const cards = [
    { title: "Moje rezerwacje", description: "Zobacz terminy i status swoich rezerwacji.", count: data.bookings.length, href: "/panel/moje-rezerwacje", Icon: CalendarDays },
    { title: "Ulubione", description: "Wróć do zapisanych wycieczek.", count: data.favorites.length, href: "/panel/ulubione", Icon: Heart },
    { title: "Moje konto", description: "Zmień nazwę wyświetlaną lub hasło.", href: "/panel/profil", Icon: UserRound },
  ];

  return (
    <>
      <PanelHeading title={"Cześć, " + data.account.name + "!"}>Zarządzaj rezerwacjami i wracaj do wycieczek, które Cię zainteresowały.</PanelHeading>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(({ title, description, count, href, Icon }) => (
          <Link key={href} href={href} className={panelCard + " flex flex-col transition hover:border-[#D6A568]"}>
            <div className="mb-4 flex items-center justify-between text-[#143B47]">
              <Icon size={22} aria-hidden="true" />
              {count !== undefined && <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold">{count}</span>}
            </div>
            <h2 className="font-semibold text-gray-900">{title}</h2>
            <p className="mb-4 mt-2 flex-1 text-sm leading-6 text-gray-600">{description}</p>
            <ArrowRight size={18} className="text-[#143B47]" aria-hidden="true" />
          </Link>
        ))}
      </div>
      <Link href="/wycieczki" className={primaryButton + " mt-6"}>Odkryj wycieczki</Link>
    </>
  );
}
