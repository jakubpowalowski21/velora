"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Tour } from "@/types/tour";
import TourCard from "./tourCard";
import { useFavorites } from "@/hooks/useFavorites";

type FilterTourProps = {
  tour: Tour[];
};

export default function FilterTour({ tour }: FilterTourProps) {
  const [isOpenMobileFilters, setIsOpenMobileFilters] = useState(false);
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("szukaj") ?? "");

  const [continent, setContinent] = useState(
    searchParams.get("kontynent") ?? "All",
  );

  const [minPrice, setMinPrice] = useState(searchParams.get("cenaMin") ?? "");

  const [maxPrice, setMaxPrice] = useState(searchParams.get("cenaMax") ?? "");

  const [duration, setDuration] = useState(
    searchParams.get("dlugosc") ?? "All",
  );

  const [category, setCategory] = useState(
    searchParams.get("kategoria") ?? "All",
  );

  const [minRate, setMinRate] = useState(searchParams.get("ocena") ?? "0");

  const [sorting, setSorting] = useState(
    searchParams.get("sortowanie") ?? "default",
  );

  const [currentPage, setCurrentPage] = useState(() => {
    const page = Number(searchParams.get("strona") ?? "1");
    return Number.isInteger(page) && page > 0 ? page : 1;
  });

  useEffect(() => {
    setSearch(searchParams.get("szukaj") ?? "");
    setContinent(searchParams.get("kontynent") ?? "All");
    setMinPrice(searchParams.get("cenaMin") ?? "");
    setMaxPrice(searchParams.get("cenaMax") ?? "");
    setDuration(searchParams.get("dlugosc") ?? "All");
    setCategory(searchParams.get("kategoria") ?? "All");
    setMinRate(searchParams.get("ocena") ?? "0");
    setSorting(searchParams.get("sortowanie") ?? "default");

    const page = Number(searchParams.get("strona") ?? "1");

    setCurrentPage(Number.isInteger(page) && page > 0 ? page : 1);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("szukaj", search.trim());
    }

    if (continent !== "All") {
      params.set("kontynent", continent);
    }

    if (minPrice !== "") {
      params.set("cenaMin", minPrice);
    }

    if (maxPrice !== "") {
      params.set("cenaMax", maxPrice);
    }

    if (duration !== "All") {
      params.set("dlugosc", duration);
    }

    if (category !== "All") {
      params.set("kategoria", category);
    }

    if (minRate !== "0") {
      params.set("ocena", minRate);
    }

    if (sorting !== "default") {
      params.set("sortowanie", sorting);
    }

    if (currentPage > 1) {
      params.set("strona", String(currentPage));
    }

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    router.replace(url, { scroll: false });
  }, [
    search,
    continent,
    minPrice,
    maxPrice,
    duration,
    category,
    minRate,
    sorting,
    currentPage,
    pathname,
    router,
  ]);

  const toursPerPage = 8;

  const filteredTours = tour.filter((tour) => {
    const matchSearch =
      tour.nazwa.toLowerCase().includes(search.toLowerCase()) ||
      tour.kraj.toLowerCase().includes(search.toLowerCase()) ||
      tour.miasto.toLowerCase().includes(search.toLowerCase());

    const matchContinent = continent === "All" || tour.kontynent === continent;
    const matchMinPrice = minPrice === "" || tour.cenaPLN >= Number(minPrice);
    const matchMaxPrice = maxPrice === "" || tour.cenaPLN <= Number(maxPrice);

    let matchDuration = true;

    if (duration === "1-3") {
      matchDuration = tour.czasDni >= 1 && tour.czasDni <= 3;
    } else if (duration === "4-7") {
      matchDuration = tour.czasDni >= 4 && tour.czasDni <= 7;
    } else if (duration === "8-14") {
      matchDuration = tour.czasDni >= 8 && tour.czasDni <= 14;
    } else if (duration === "15+") {
      matchDuration = tour.czasDni >= 15;
    }

    const matchCategory = category === "All" || tour.kategoria === category;
    const matchRate = tour.ocena >= Number(minRate);

    return (
      matchSearch &&
      matchContinent &&
      matchMinPrice &&
      matchMaxPrice &&
      matchDuration &&
      matchCategory &&
      matchRate
    );
  });

  const sortedTours = [...filteredTours].sort((a, b) => {
    switch (sorting) {
      case "cena-rosnaco":
        return a.cenaPLN - b.cenaPLN;

      case "cena-malejaco":
        return b.cenaPLN - a.cenaPLN;

      case "ocena":
        return b.ocena - a.ocena;

      case "czas-rosnaco":
        return a.czasDni - b.czasDni;

      case "czas-malejaco":
        return b.czasDni - a.czasDni;

      default:
        return a.id - b.id;
    }
  });

  const totalPages = Math.ceil(sortedTours.length / toursPerPage);

  const startIndex = (currentPage - 1) * toursPerPage;

  const endIndex = startIndex + toursPerPage;

  const paginatedTours = sortedTours.slice(startIndex, endIndex);

  const changePage = (page: number) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-6 flex w-full min-w-0 flex-col gap-8 lg:flex-row">
      {/* Przycisk rozwijania filtrów dla wersji mobilnej */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpenMobileFilters((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white p-4 font-medium text-gray-700 shadow-sm"
        >
          <span>Filtry i wyszukiwanie</span>
          <svg
            className={`h-5 w-5 transform transition-transform ${
              isOpenMobileFilters ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Panel filtrów na komputerze po lewej (ok. 25-30% szerokości) bez efektu sticky */}

      <aside
        className={`${
          isOpenMobileFilters ? "block" : "hidden"
        } w-full min-w-0 lg:block lg:w-[28%] lg:shrink-0`}
      >
        <div className="flex min-w-0 flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Filtry</h2>
          <div className="w-full min-w-0">
            <label
              htmlFor="sortowanie"
              className="mb-1 block text-sm font-medium"
            >
              Sortuj według
            </label>

            <select
              id="sortowanie"
              value={sorting}
              onChange={(e) => {
                setSorting(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:border-blue-500 focus:outline-none"
            >
              <option value="default">Domyślnie</option>
              <option value="cena-rosnaco">Cena: od najniższej</option>
              <option value="cena-malejaco">Cena: od najwyższej</option>
              <option value="ocena">Najwyżej oceniane</option>
              <option value="czas-rosnaco">Najkrótsze wycieczki</option>
              <option value="czas-malejaco">Najdłuższe wycieczki</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="wyszukiwanie"
              className="mb-1 block text-sm font-medium"
            >
              Wyszukaj wycieczkę
            </label>

            <input
              id="wyszukiwanie"
              type="search"
              placeholder="Wpisz nazwę, kraj lub miasto..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="kontynent"
              className="mb-1 block text-sm font-medium"
            >
              Kontynent
            </label>

            <select
              id="kontynent"
              value={continent}
              onChange={(e) => {
                setContinent(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
            >
              <option value="All">Wszystkie</option>
              <option value="Europa">Europa</option>
              <option value="Azja">Azja</option>
              <option value="Afryka">Afryka</option>
              <option value="Ameryka Północna">Ameryka Północna</option>
              <option value="Ameryka Południowa">Ameryka Południowa</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>

          <div>
            <label htmlFor="cenaMin" className="mb-1 block text-sm font-medium">
              Cena minimalna (zł)
            </label>

            <input
              id="cenaMin"
              type="number"
              min="0"
              placeholder="Od"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="cenaMax" className="mb-1 block text-sm font-medium">
              Cena maksymalna (zł)
            </label>

            <input
              id="cenaMax"
              type="number"
              min="0"
              placeholder="Do"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="dlugosc" className="mb-1 block text-sm font-medium">
              Długość wycieczki
            </label>

            <select
              id="dlugosc"
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
            >
              <option value="All">Dowolna</option>
              <option value="1-3">1–3 dni</option>
              <option value="4-7">4–7 dni</option>
              <option value="8-14">8–14 dni</option>
              <option value="15+">15+ dni</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="kategoria"
              className="mb-1 block text-sm font-medium"
            >
              Kategoria
            </label>

            <select
              id="kategoria"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
            >
              <option value="All">Wszystkie</option>
              <option value="Natura">Natura</option>
              <option value="Kultura">Kultura</option>
              <option value="Relaks">Relaks</option>
              <option value="Przygoda">Przygoda</option>
              <option value="City break">City break</option>
              <option value="Aktywna">Aktywna</option>
              <option value="Kulinarna">Kulinarna</option>
              <option value="Historia">Historia</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="minimalnaOcena"
              className="mb-1 block text-sm font-medium"
            >
              Minimalna ocena
            </label>

            <select
              id="minimalnaOcena"
              value={minRate}
              onChange={(e) => {
                setMinRate(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
            >
              <option value="0">Dowolna</option>
              <option value="4">4,0 i więcej</option>
              <option value="4.5">4,5 i więcej</option>
            </select>
          </div>

          <button
            type="button"
            className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm font-medium hover:bg-gray-100"
            onClick={() => {
              setSearch("");
              setContinent("All");
              setMinPrice("");
              setMaxPrice("");
              setDuration("All");
              setCategory("All");
              setMinRate("0");
              setSorting("default");
              setCurrentPage(1);
            }}
          >
            Wyczyść filtry
          </button>
        </div>
      </aside>

      {/* Sekcja wycieczek po prawej stronie */}
      <main className="min-w-0 flex-1">
        <p aria-live="polite" className="text-gray-600">
          Znaleziono wycieczek: {filteredTours.length}
        </p>

        {filteredTours.length === 0 && (
          <div
            role="status"
            className="mt-6 rounded-xl border border-gray-200 p-10 text-center"
          >
            <h2 className="text-xl font-semibold">Nie znaleziono wycieczek</h2>
            <p className="mt-2 text-gray-600">
              Spróbuj zmienić kryteria wyszukiwania.
            </p>
          </div>
        )}

        {/* Sekcja kart wycieczek z rozciągnięciem kart oraz zdjęć wewnątrz na 100% szerokości */}
        <section className="mt-6 grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2">
          {paginatedTours.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              isFavorite={isFavorite(tour.id)}
              onToggleFavorite={() => toggleFavorite(tour.id)}
              favoritesLoaded={isLoaded}
            />
          ))}
        </section>

        {totalPages > 1 && (
          <nav
            aria-label="Paginacja wycieczek"
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
          >
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}
              className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-100"
            >
              Poprzednia
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => changePage(page)}
                  aria-label={`Strona ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                  className={`rounded-lg border px-4 py-2 ${
                    currentPage === page
                      ? "bg-blue-950 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => changePage(currentPage + 1)}
              className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-100"
            >
              Następna
            </button>
          </nav>
        )}
      </main>
    </div>
  );
}
