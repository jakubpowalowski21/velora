"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { formatDate, formatPrice, type Booking } from "@/lib/panel";
import { usePanel } from "./panel-provider";
import { BookingStatusBadge, EmptyPanel, PanelHeading, PanelNotice, panelCard, primaryButton, secondaryButton } from "./panel-ui";
import { usePanelTask } from "./use-panel-task";

function BookingFacts({ booking }: { booking: Booking }) {
  return (
    <dl className="grid gap-3 text-sm sm:grid-cols-3">
      <div><dt className="text-gray-500">Termin wyjazdu</dt><dd className="mt-1 font-medium">{formatDate(booking.date)}</dd></div>
      <div><dt className="text-gray-500">Uczestnicy</dt><dd className="mt-1 font-medium">{booking.participants}</dd></div>
      <div><dt className="text-gray-500">Kwota łączna</dt><dd className="mt-1 font-medium">{formatPrice(booking.total)}</dd></div>
    </dl>
  );
}

export function BookingsList() {
  const { data } = usePanel();
  const bookings = data?.bookings ?? [];

  return (
    <>
      <PanelHeading title="Moje rezerwacje">Sprawdź terminy, szczegóły i status płatności demonstracyjnych.</PanelHeading>
      {bookings.length ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <article key={booking.id} className={panelCard}>
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <h2 className="text-lg font-semibold">{booking.tourName}</h2>
                <BookingStatusBadge status={booking.status} />
              </div>
              <BookingFacts booking={booking} />
              <Link className={secondaryButton + " mt-5"} href={"/panel/moje-rezerwacje/" + booking.id}>
                {booking.status === "pending" || booking.status === "declined" ? "Przejdź do płatności" : "Zobacz szczegóły"}
              </Link>
            </article>
          ))}
        </div>
      ) : <EmptyPanel title="Nie masz jeszcze rezerwacji">Wybierz wycieczkę z katalogu i przejdź przez rezerwację demonstracyjną.</EmptyPanel>}
    </>
  );
}

export function BookingDetails() {
  const { id } = useParams<{ id: string }>();
  const { data } = usePanel();
  const booking = data?.bookings.find((item) => item.id === id);

  return (
    <>
      <Link href="/panel/moje-rezerwacje" className="mb-4 inline-block text-sm font-semibold text-blue-950 hover:underline">← Wróć do rezerwacji</Link>
      {booking ? <BookingPayment key={booking.id} booking={booking} /> : (
        <>
          <PanelHeading title="Nie znaleziono rezerwacji" />
          <PanelNotice error>Na Twoim koncie nie ma rezerwacji o tym numerze.</PanelNotice>
        </>
      )}
    </>
  );
}

function BookingPayment({ booking }: { booking: Booking }) {
  const { run, busy, error } = usePanelTask();
  const [confirmCancel, setConfirmCancel] = useState(false);
  const payable = booking.status === "pending" || booking.status === "declined";

  async function cancel() {
    if (await run({ action: "cancel", id: booking.id })) setConfirmCancel(false);
  }

  return (
    <>
      <PanelHeading title="Szczegóły rezerwacji">{booking.tourName}</PanelHeading>
      <section className={panelCard + " space-y-5"}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold">Podsumowanie</h2>
            <p className="mt-1 break-all text-xs text-gray-500">Numer rezerwacji {booking.id}</p>
          </div>
          <BookingStatusBadge status={booking.status} />
        </div>
        <BookingFacts booking={booking} />
        <Link href={"/wycieczki/" + booking.tourSlug} className="inline-block text-sm font-semibold text-blue-950 hover:underline">Zobacz wycieczkę</Link>
      </section>
      <section className={panelCard + " mt-5 space-y-4"}>
        <h2 className="text-lg font-semibold">Płatność demonstracyjna</h2>
        {booking.status === "paid" && <PanelNotice>Symulacja płatności zakończyła się powodzeniem. Rezerwacja jest potwierdzona.</PanelNotice>}
        {booking.status === "cancelled" && <PanelNotice>Rezerwacja została anulowana.</PanelNotice>}
        {booking.status === "declined" && <PanelNotice error>Płatność została odrzucona w symulacji. Możesz spróbować ponownie.</PanelNotice>}
        {payable && (
          <>
            <p className="text-sm leading-6 text-gray-600">Wybierz wynik symulacji. Żadne środki nie zostaną pobrane.</p>
            <div className="flex flex-wrap gap-2">
              <button disabled={busy} className={primaryButton}
                onClick={() => void run({ action: "pay", id: booking.id, result: "paid" })}>
                Symuluj płatność · {formatPrice(booking.total)}
              </button>
              <button disabled={busy} className={secondaryButton}
                onClick={() => void run({ action: "pay", id: booking.id, result: "declined" })}>
                Symuluj odrzucenie
              </button>
            </div>
          </>
        )}
        {error && <PanelNotice error>{error}</PanelNotice>}
        {booking.status !== "cancelled" && (
          <div className="border-t border-gray-100 pt-4">
            {confirmCancel ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-700">Czy chcesz anulować tę rezerwację?</p>
                <div className="flex flex-wrap gap-2">
                  <button disabled={busy} className={secondaryButton + " !text-red-800"} onClick={cancel}>Potwierdź anulowanie</button>
                  <button disabled={busy} className={secondaryButton} onClick={() => setConfirmCancel(false)}>Zachowaj rezerwację</button>
                </div>
              </div>
            ) : (
              <button disabled={busy} className="min-h-11 text-sm font-semibold text-red-800 hover:underline" onClick={() => setConfirmCancel(true)}>Anuluj rezerwację</button>
            )}
          </div>
        )}
      </section>
    </>
  );
}
