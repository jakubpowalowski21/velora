import Image from "next/image";
import { Suspense } from "react";
import { connection } from "next/server";
import Best from "@/components/home/best";
import wycieczki from "@/data/wycieczki.json";
import { Why, WhyItem } from "@/components/home/why";

async function RandomTours() {
  await connection();

  const shuffled = [...wycieczki];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return <Best tours={shuffled.slice(0, 6)} />;
}

export default function Home() {
  const whyData: WhyItem[] = [
    {
      id: 100,
      icon: "Plane",
      title: "Starannie wybrane kierunki",
      description:
        "Każda podróż została zaplanowana z myślą o wyjątkowych doświadczeniach i autentycznym poznawaniu świata.",
    },
    {
      id: 101,
      icon: "UserRoundGroup",
      title: "Małe grupy",
      description:
        "Podróżuj w kameralnym gronie i odkrywaj miejsca bez pośpiechu.",
    },
    {
      id: 102,
      icon: "Flag",
      title: "Lokalni przewodnicy",
      description:
        "Poznawaj kulturę, historię i tradycje dzięki osobą, które naprawde znają odwiedzane miejsca.",
    },
    {
      id: 103,
      icon: "CalendarDays",
      title: "Przejrzyste rezerwacje",
      description:
        "Wszystkie najważniejsze informacje dotyczące wycieczki i jej kosztów znajdziesz w jednym miejscu.",
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative w-full min-h-100 md:min-h-112.5 flex items-center px-6 md:px-16 py-16 overflow-hidden">
        <Image
          src="/home/hero.png"
          alt="Santorini"
          fill
          className="object-cover object-center z-10 hidden lg:block"
          priority
        />
        <Image
          src="/home/hero-mobile.png"
          alt="Santorini"
          fill
          className="object-cover object-center z-10 lg:hidden"
          priority
        />
        <div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-linear-to-r from-[#143B47]/90 to-transparent -z-10" />
        {/* Zawartość */}
        <div className="relative z-10 text-white w-full md:w-1/2 lg:w-2/5">
          <h1 className="text-4xl font-bold mb-4">
            Odkrywaj świat. <br />
            Kolekcjonuj wspomnienia.
          </h1>
          <p className="text-gray-200 text-lg leading-relaxed">
            Od malowniczych uliczek europejskich miast po dzikie krajobrazy
            odległych kontynentów. Znajdź podróż, która zostanie z tobą na
            długo.
          </p>
          <div className="bg-[#D6A568] w-20 h-2 mt-4"></div>
        </div>
      </section>
      {/* Podróże */}
      <section className="px-6 py-8">
        <div className="w-full md:w-1/2">
          <h1 className="text-[#D6A568] text-xl font-semibold">
            Popularne wycieczki
          </h1>
          <h2 className="text-4xl font-bold">
            Podróże, które pokochali nasi odkrywcy
          </h2>
        </div>
        {/* Karty */}
        <Suspense fallback={<p className="mt-6">Ładowanie wycieczek…</p>}>
          <RandomTours />
        </Suspense>
      </section>
      {/* Dlaczego */}
      <section className="flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full">
          <h1 className="text-[#D6A568] text-xl font-semibold text-center">
            Dlaczego VELORA
          </h1>
          <h2 className="text-4xl font-bold text-center">
            Podróżowanie powinno być przyjemnością
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Why items={whyData} />
        </div>
      </section>
      {/* Opinie */}
      <section className="px-6 py-8 bg-[#143B47]">
        <div className="w-full">
          <h1 className="text-[#D6A568] text-xl font-semibold text-center">
            Opinie podróżników
          </h1>
          <h2 className="text-4xl text-white font-bold text-center">
            Historie, które inspirują do podróży
          </h2>
        </div>

        {/* Kontener trzymający 3 osobne karty */}
        <div className="flex flex-col md:flex-row mt-5 gap-4">
          {/* KARTA 1: Anna */}
          <div className="bg-white flex rounded-2xl shadow-2xl p-4 md:w-1/3 items-start">
            <div className="text-[#D6A568] bg-[#fadab1] rounded-full px-5 py-3 text-4xl shrink-0">
              A
            </div>
            <div className="flex flex-col gap-2 items-start ml-3">
              <p className="text-lg font-semibold">Anna K. - Islandia</p>
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p>
                "Niesamowite krajobrazy i świetnie zaplanowana trasa. Każdy
                dzień przynosił coś nowego. Zdecydowanie jedna z moich
                najbardziej pamiętnych podróży."
              </p>
            </div>
          </div>{" "}
          {/* <-- Tutaj brakowało zamknięcia pierwszej karty */}
          {/* KARTA 2: Michał */}
          <div className="bg-white flex rounded-2xl shadow-2xl p-4 md:w-1/3 items-start">
            <div className="text-[#D6A568] bg-[#fadab1] rounded-full px-5 py-3 text-4xl shrink-0">
              M
            </div>
            <div className="flex flex-col gap-2 items-start ml-3">
              <p className="text-lg font-semibold">Michał P. - Japonia</p>
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p>
                "Doskonałe połączenie zwiedzania i czasu wolnego. Szczególnie
                podobały mi się miejsca, do których trudno byłoby trafić
                samemu."
              </p>
            </div>
          </div>
          {/* KARTA 3: Karolina */}
          <div className="bg-white flex rounded-2xl shadow-2xl p-4 md:w-1/3 items-start">
            <div className="text-[#D6A568] bg-[#fadab1] rounded-full px-5 py-3 text-4xl shrink-0">
              K
            </div>
            <div className="flex flex-col gap-2 items-start ml-3">
              <p className="text-lg font-semibold">Karolina M. - Włochy</p>
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p>
                "Kameralna atmosfera, piękne miejsca i mnóstwo niezapomnianych
                chwil. Chętnie wybrałabym się na kolejną podróż."
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
