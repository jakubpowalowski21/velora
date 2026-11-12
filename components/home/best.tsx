"use client";

import { useState } from "react";
import TourCard from "@/components/tours/tourCard";
import { useFavorites } from "@/hooks/useFavorites";
import type { Tour } from "@/types/tour";

export default function Best({ tours }: { tours: Tour[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

  if (tours.length === 0) return null;

  function move(direction: -1 | 1) {
    setActiveIndex(
      (index) => (index + direction + tours.length) % tours.length,
    );
  }

  const arrowClass =
    "grid size-10 place-items-center rounded-full border text-2xl disabled:opacity-40 lg:hidden";

  return (
    <div className="mt-6 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 lg:grid-cols-3 lg:items-stretch lg:gap-6">
      <button
        type="button"
        aria-label="Poprzednia wycieczka"
        className={arrowClass}
        disabled={tours.length < 2}
        onClick={() => move(-1)}
      >
        <span aria-hidden="true">‹</span>
      </button>

      {tours.map((tour, index) => (
        <div
          key={tour.id}
          className={index === activeIndex ? "block" : "hidden lg:block"}
        >
          <TourCard
            tour={tour}
            isFavorite={isFavorite(tour.id)}
            onToggleFavorite={() => toggleFavorite(tour.id)}
            favoritesLoaded={isLoaded}
          />
        </div>
      ))}

      <button
        type="button"
        aria-label="Następna wycieczka"
        className={arrowClass}
        disabled={tours.length < 2}
        onClick={() => move(1)}
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>
  );
}
