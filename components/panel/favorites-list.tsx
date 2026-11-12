"use client";

import TourCard from "@/components/tours/tourCard";
import type { Tour } from "@/types/tour";
import { usePanel } from "./panel-provider";
import { EmptyPanel, PanelHeading } from "./panel-ui";

export function FavoritesList({ tours }: { tours: Tour[] }) {
  const { data } = usePanel();
  const favorites = tours.filter(({ id }) => data?.favorites.includes(id));

  return (
    <>
      <PanelHeading title="Ulubione wycieczki">Wszystkie wycieczki zapisane na Twoim koncie.</PanelHeading>
      {favorites.length ? (
        <div className="grid gap-5 sm:grid-cols-2">
          {favorites.map((tour) => <TourCard key={tour.id} tour={tour} />)}
        </div>
      ) : (
        <EmptyPanel title="Twoja lista jest pusta">Kliknij serce przy wycieczce w katalogu, aby zapisać ją na później.</EmptyPanel>
      )}
    </>
  );
}
