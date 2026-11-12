import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Checkout } from "@/components/panel/checkout";
import tours from "@/data/wycieczki.json";

export const metadata = { title: "Rezerwacja wycieczki | VELORA" };

export function generateStaticParams() {
  return tours.map(({ slug }) => ({ slug }));
}

export default function CheckoutPage({ params }: PageProps<"/panel/rezerwacja/[slug]">) {
  return (
    <Suspense fallback={<p role="status">Ładowanie rezerwacji…</p>}>
      <CheckoutContent params={params} />
    </Suspense>
  );
}

async function CheckoutContent({ params }: Pick<PageProps<"/panel/rezerwacja/[slug]">, "params">) {
  const { slug } = await params;
  const tour = tours.find((tour) => tour.slug === slug);
  if (!tour) notFound();
  const { nazwa, cenaPLN, terminy, limitMiejsc } = tour;
  return <Checkout tour={{ slug, nazwa, cenaPLN, terminy, limitMiejsc }} />;
}
