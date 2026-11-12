import Link from "next/link";
import Image from "next/image";
import type { Tour } from "@/types/tour";

type TourCardProps = {
  tour: Tour;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  favoritesLoaded: boolean;
};

export default function TourCard({
  tour,
  isFavorite,
  onToggleFavorite,
  favoritesLoaded,
}: TourCardProps) {
  return (
    <article className="min-w-0 w-full overflow-hidden rounded-2xl border shadow-xl">
      <div className="relative">
        <Image
          src={tour.zdjecie}
          alt={tour.nazwa}
          width={800}
          height={450}
          className="aspect-video w-full object-cover"
        />

        <button
          type="button"
          onClick={onToggleFavorite}
          disabled={!favoritesLoaded}
          aria-label={
            isFavorite
              ? `Usuń ${tour.nazwa} z ulubionych`
              : `Dodaj ${tour.nazwa} do ulubionych`
          }
          aria-pressed={isFavorite}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-5 w-5 ${isFavorite ? "text-red-500" : "text-gray-700"}`}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
          </svg>
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {tour.kraj} · {tour.miasto}
          </p>

          <span className="text-sm font-medium">★ {tour.ocena}</span>
        </div>

        <h2 className="mt-3 text-xl font-semibold">{tour.nazwa}</h2>

        <p className="mt-2 text-sm text-gray-600">
          {tour.czasDni} dni · {tour.kategoria}
        </p>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs text-gray-500">Od osoby</p>

            <p className="text-xl font-bold">
              {tour.cenaPLN.toLocaleString("pl-PL")} zł
            </p>
          </div>

          <Link
            href={`/wycieczki/${tour.slug}`}
            className="rounded-lg bg-blue-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
          >
            Zobacz więcej
          </Link>
        </div>
      </div>
    </article>
  );
}
