"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { formatDate, formatPrice, todayInPoland } from "@/lib/panel";
import type { Tour } from "@/types/tour";
import { inputClass, panelCard, PanelHeading, PanelNotice, primaryButton } from "./panel-ui";
import { usePanelTask } from "./use-panel-task";

type CheckoutTour = Pick<Tour, "slug" | "nazwa" | "cenaPLN" | "terminy" | "limitMiejsc">;

export function Checkout({ tour }: { tour: CheckoutTour }) {
  const router = useRouter();
  const { run, busy, error } = usePanelTask();
  const [participants, setParticipants] = useState(1);
  const bookingId = useRef<string | null>(null);
  const today = todayInPoland();
  const dates = tour.terminy.filter((date) => date >= today);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const id = bookingId.current ??= window.crypto.randomUUID();
    if (await run({ action: "book", id, slug: tour.slug, date: String(form.get("date")), participants })) {
      router.push("/panel/moje-rezerwacje/" + id);
    }
  }

  return (
    <>
      <Link href={"/wycieczki/" + tour.slug} className="mb-4 inline-block text-sm font-semibold text-blue-950 hover:underline">← Wróć do wycieczki</Link>
      <PanelHeading title="Zarezerwuj wycieczkę">{tour.nazwa}</PanelHeading>
      {dates.length ? (
        <form onSubmit={submit} className={panelCard + " grid gap-5 sm:grid-cols-2"}>
          <label className="grid gap-1.5 text-sm font-semibold">
            Termin wyjazdu
            <select name="date" className={inputClass} required>
              {dates.map((date) => <option key={date} value={date}>{formatDate(date)}</option>)}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-semibold">
            Liczba uczestników
            <select className={inputClass} value={participants} onChange={(event) => setParticipants(Number(event.target.value))}>
              {Array.from({ length: tour.limitMiejsc }, (_, index) => index + 1).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>
          <div className="rounded-xl bg-gray-50 p-4 sm:col-span-2">
            <p className="text-sm text-gray-600">{formatPrice(tour.cenaPLN)} za osobę</p>
            <p className="mt-1 text-2xl font-bold text-blue-950" aria-live="polite">Razem {formatPrice(tour.cenaPLN * participants)}</p>
          </div>
          <div className="space-y-4 sm:col-span-2">
            <PanelNotice>To rezerwacja demonstracyjna. Następny krok pozwoli zasymulować płatność.</PanelNotice>
            {error && <PanelNotice error>{error}</PanelNotice>}
            <button disabled={busy} className={primaryButton}>{busy ? "Zapisywanie…" : "Przejdź do płatności demo"}</button>
          </div>
        </form>
      ) : <PanelNotice>Obecnie brak nadchodzących terminów tej wycieczki.</PanelNotice>}
    </>
  );
}
