import wycieczki from "@/data/wycieczki.json";
import FilterTour from "@/components/tours/filterTour";
import { Suspense } from "react";

export const metadata = {
  title: "Wycieczki po świecie | VELORA",
  description:
    "Odkryj wyjątkowe wycieczki po całym świecie. Sprawdź kierunki, terminy i ceny podróży z VELORA.",
};

export default function ToursPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold">Odkryj świat z VELORA</h1>

      <p className="mt-4 text-gray-600">Znajdź swoją wymarzoną podróż.</p>

      <Suspense fallback={<p className="mt-10">Ładowanie katalogu...</p>}>
        <FilterTour tour={wycieczki} />
      </Suspense>
    </main>
  );
}
