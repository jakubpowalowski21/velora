"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "velora-favorites";
const EVENT_NAME = "velora-favorites-change";

const EMPTY_FAVORITES: number[] = [];

let cachedValue: string | null = null;
let cachedFavorites: number[] = EMPTY_FAVORITES;

function getSnapshot(): number[] {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved === cachedValue) {
    return cachedFavorites;
  }

  cachedValue = saved;

  try {
    const parsed: unknown = saved ? JSON.parse(saved) : [];

    cachedFavorites = Array.isArray(parsed)
      ? parsed.filter(
          (id): id is number => typeof id === "number" && Number.isInteger(id),
        )
      : EMPTY_FAVORITES;
  } catch {
    cachedFavorites = EMPTY_FAVORITES;
  }

  return cachedFavorites;
}

function getServerSnapshot(): number[] {
  return EMPTY_FAVORITES;
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useFavorites() {
  const favorites = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const toggleFavorite = (id: number) => {
    const currentFavorites = getSnapshot();

    const updatedFavorites = currentFavorites.includes(id)
      ? currentFavorites.filter((favoriteId) => favoriteId !== id)
      : [...currentFavorites, id];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));

    window.dispatchEvent(new Event(EVENT_NAME));
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    isLoaded: true,
  };
}
