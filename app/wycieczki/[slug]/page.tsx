import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";

import type { Tour } from "@/types/tour";
import toursData from "@/data/wycieczki.json";

type TourPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const tours = toursData as Tour[];

// Dynamiczne SEO
export async function generateMetadata({
  params,
}: TourPageProps): Promise<Metadata> {
  const { slug } = await params;

  const tour = tours.find((item) => item.slug === slug);

  if (!tour) {
    return {
      title: "Nie znaleziono wycieczki | VELORA",
    };
  }

  return {
    title: `${tour.nazwa} | VELORA`,
    description: tour.skroconyOpis,
  };
}

// Generowanie stron na podstawie JSON
export function generateStaticParams() {
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

export default function TourPage({ params }: TourPageProps) {
  return (
    <Suspense fallback={<main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12" role="status">Ładowanie wycieczki…</main>}>
      <TourDetails params={params} />
    </Suspense>
  );
}

async function TourDetails({ params }: TourPageProps) {
  const { slug } = await params;

  const tour = tours.find((item) => item.slug === slug);

  if (!tour) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-7xl min-w-0 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Nawigacja okruszkowa */}
      <nav
        aria-label="Ścieżka nawigacji"
        className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500"
      >
        <Link href="/" className="hover:text-blue-950">
          Strona główna
        </Link>

        <span>/</span>

        <Link href="/wycieczki" className="hover:text-blue-950">
          Wycieczki
        </Link>

        <span>/</span>

        <span className="font-medium text-gray-900">{tour.nazwa}</span>
      </nav>

      {/* Nagłówek */}
      <header className="mb-8">
        <p className="text-sm font-medium text-blue-900">
          {tour.kontynent} / {tour.kraj} / {tour.miasto}
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          {tour.nazwa}
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
          {tour.skroconyOpis}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full bg-amber-50 px-4 py-2 font-medium text-amber-800">
            ★ {tour.ocena} ({tour.liczbaOpinii} opinii)
          </span>

          <span className="rounded-full bg-gray-100 px-4 py-2 text-gray-700">
            {tour.czasDni} dni
          </span>

          <span className="rounded-full bg-gray-100 px-4 py-2 text-gray-700">
            {tour.kategoria}
          </span>

          <span className="rounded-full bg-gray-100 px-4 py-2 text-gray-700">
            Maks. {tour.limitMiejsc} uczestników
          </span>
        </div>
      </header>

      {/* Zdjęcie główne */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm sm:aspect-[16/7]">
        <Image
          src={tour.zdjecie}
          alt={tour.nazwa}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />
      </div>

      {/* Główna zawartość */}
      <div className="mt-10 grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        {/* Lewa kolumna */}
        <div className="min-w-0 space-y-12">
          {/* Opis */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">O wycieczce</h2>

            <p className="mt-5 whitespace-pre-line leading-8 text-gray-700">
              {tour.opis}
            </p>
          </section>

          {/* Plan podróży */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">Plan podróży</h2>

            <p className="mt-2 text-sm text-gray-500">
              Poznaj przebieg swojej podróży.
            </p>

            <div className="mt-6 space-y-4">
              {tour.plan.map((day) => (
                <div
                  key={day.dzien}
                  className="flex min-w-0 gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-950 text-sm font-semibold text-white">
                    {day.dzien}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900">{day.tytul}</h3>

                    <p className="mt-2 leading-7 text-gray-600">{day.opis}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Co zawiera cena */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              Co obejmuje cena?
            </h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {/* W cenie */}
              <div className="rounded-xl border border-green-100 bg-green-50/50 p-5">
                <h3 className="font-semibold text-green-800">
                  W cenie wycieczki
                </h3>

                <ul className="mt-5 space-y-3">
                  {tour.zawiera.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm leading-6 text-gray-700"
                    >
                      <span
                        aria-hidden="true"
                        className="font-bold text-green-700"
                      >
                        ✓
                      </span>

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Poza ceną */}
              <div className="rounded-xl border border-red-100 bg-red-50/50 p-5">
                <h3 className="font-semibold text-red-800">
                  Cena nie obejmuje
                </h3>

                <ul className="mt-5 space-y-3">
                  {tour.nieZawiera.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm leading-6 text-gray-700"
                    >
                      <span
                        aria-hidden="true"
                        className="font-bold text-red-700"
                      >
                        ×
                      </span>

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Informacje organizacyjne */}
          <section className="rounded-2xl bg-gray-50 p-6">
            <h2 className="text-xl font-bold text-gray-900">
              Informacje organizacyjne
            </h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">Kierunek</p>

                <p className="mt-1 font-medium text-gray-900">
                  {tour.kraj}, {tour.miasto}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Kontynent</p>

                <p className="mt-1 font-medium text-gray-900">
                  {tour.kontynent}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Czas trwania</p>

                <p className="mt-1 font-medium text-gray-900">
                  {tour.czasDni} dni
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Maksymalna liczba uczestników
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {tour.limitMiejsc} osób
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Prawa kolumna — rezerwacja */}
        <aside className="min-w-0 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
            <p className="text-sm text-gray-500">Cena od osoby</p>

            <p className="mt-1 text-3xl font-bold text-blue-950">
              {tour.cenaPLN.toLocaleString("pl-PL")} zł
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Cena podstawowa za jednego uczestnika
            </p>

            <div className="my-6 border-t border-gray-200" />

            <h3 className="font-semibold text-gray-900">Dostępne terminy</h3>

            <p className="mt-2 text-sm text-gray-600">
              Liczba terminów: {tour.terminy.length}
            </p>

            <div className="mt-4 space-y-2">
              {tour.terminy.map((termin, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700"
                >
                  {termin}
                </div>
              ))}
            </div>

            <Link
              href={"/panel/rezerwacja/" + tour.slug}
              className="mt-6 block w-full rounded-lg bg-blue-950 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-800"
            >
              Zarezerwuj wycieczkę
            </Link>

            <p className="mt-3 text-center text-xs text-gray-500">
              Rezerwacja i płatność w trybie demonstracyjnym.
            </p>
          </div>

          <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-5">
            <h3 className="font-semibold text-gray-900">Masz pytania?</h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Potrzebujesz dodatkowych informacji o wycieczce? Skontaktuj się z
              nami.
            </p>

            <Link
              href="/kontakt"
              className="mt-4 inline-block text-sm font-semibold text-blue-950 hover:underline"
            >
              Przejdź do kontaktu
            </Link>
          </div>
        </aside>
      </div>

      {/* Powrót do katalogu */}
      <div className="mt-14 border-t border-gray-200 pt-8">
        <Link
          href="/wycieczki"
          className="inline-flex items-center gap-2 font-medium text-blue-950 hover:underline"
        >
          ← Wróć do wszystkich wycieczek
        </Link>
      </div>
    </main>
  );
}
