import Link from "next/link";
import type { ReactNode } from "react";
import { bookingLabels, type BookingStatus } from "@/lib/panel";

export const primaryButton = "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50";
export const secondaryButton = "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-blue-950 transition hover:border-blue-950 disabled:cursor-not-allowed disabled:opacity-50";
export const inputClass = "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 font-normal outline-none focus:border-blue-950 focus:ring-1 focus:ring-blue-950";
export const panelCard = "rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6";

export function PanelHeading({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header className="mb-7">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>
      {children && <p className="mt-3 max-w-2xl leading-7 text-gray-600">{children}</p>}
    </header>
  );
}

export function EmptyPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={panelCard}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mb-5 mt-2 text-sm leading-6 text-gray-600">{children}</p>
      <Link href="/wycieczki" className={primaryButton}>Przeglądaj wycieczki</Link>
    </div>
  );
}

const statusColors: Record<BookingStatus, string> = {
  pending: "bg-amber-50 text-amber-900",
  declined: "bg-red-50 text-red-800",
  paid: "bg-green-50 text-green-800",
  cancelled: "bg-gray-100 text-gray-700",
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span className={"inline-flex rounded-full px-3 py-1 text-xs font-semibold " + statusColors[status]}>
      {bookingLabels[status]}
    </span>
  );
}

export function PanelNotice({ children, error = false }: { children: ReactNode; error?: boolean }) {
  return (
    <p role={error ? "alert" : "status"} className={"rounded-lg px-4 py-3 text-sm " + (error ? "bg-red-50 text-red-800" : "bg-gray-100 text-gray-700")}>
      {children}
    </p>
  );
}
