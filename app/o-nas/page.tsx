import Image from "next/image";
import { Values, ValuesItem } from "@/components/about/values";
import { Numbers, NumbersItem } from "@/components/about/numbers";
import { People, PeopleItem } from "@/components/about/people";

export const metadata = {
  title: "O nas | VELORA",
  description: "Dowiedz się więcej o marce VELORA",
};

export default function AboutUsPage() {
  const valueData: ValuesItem[] = [
    {
      id: 1,
      icon: "Gem",
      title: "Doświadczenie",
      description:
        "Łączymy wiedzę, pasję i wieloletnie doświadczenie w organizacji podróży",
    },
    {
      id: 2,
      icon: "ShieldCheck",
      title: "Bezpieczeństwo",
      description:
        "Dbamy o twój komfort i bezpieczeństwo na każdym etapie podróży",
    },
    {
      id: 3,
      icon: "UserRoundGroup",
      title: "Ludzie",
      description:
        "Współpracujemy z lokalnymi przewodnikami, którzy dzielą się swoją pasją i wiedzą",
    },
    {
      id: 4,
      icon: "Leaf",
      title: "Odpowiedzialne podróże",
      description:
        "Wspieramy lokalne społeczności i promujemy świadome podróżowanie",
    },
  ];
  const numbersData: NumbersItem[] = [
    {
      id: 1,
      icon: "Briefcase",
      number: "36",
      description: "Wyjątkowych wycieczek",
    },
    {
      id: 2,
      icon: "UserRoundGroup",
      number: "1 200+",
      description: "Zadowolonych podróżników",
    },
    {
      id: 3,
      icon: "Globe",
      number: "6",
      description: "Kontynentów",
    },
    {
      id: 4,
      icon: "Star",
      number: "4,8/5",
      description: "Średnia ocena podróży",
    },
  ];
  const peopleData: PeopleItem[] = [
    {
      id: 1,
      photo: "/about/people/CEO.png",
      name: "Anna Kowalska",
      description: "Założycielka i CEO",
    },
    {
      id: 2,
      photo: "/about/people/Dyrektor.png",
      name: "Michał Nowak",
      description: "Dyrektor ds. wycieczek",
    },
    {
      id: 3,
      photo: "/about/people/Specjalista.png",
      name: "Katarzyna Lewandowska",
      description: "Specjalista ds. organizacji",
    },
    {
      id: 4,
      photo: "/about/people/Doradca.png",
      name: "Piotr Zieliński",
      description: "Doradca podróży",
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative w-full min-h-100 md:min-h-112.5 flex items-center px-6 md:px-16 py-16 overflow-hidden">
        {/* Zdjęcie w tle dopasowane do sekcji */}
        <Image
          src="/about/hero.jpg"
          alt="Ludzie w górach"
          fill
          className="object-cover object-center -z-10 hidden lg:block"
          priority
        />
        <Image
          src="/about/hero-mobile.jpg"
          alt="Ludzie w górach"
          fill
          className="object-cover object-center -z-10 lg:hidden"
          priority
        />

        {/* Gradient nakładany na tło */}
        <div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-linear-to-r from-[#143B47]/90 to-transparent -z-10" />

        {/* Zawartość */}
        <div className="relative z-10 text-white w-full md:w-1/2 lg:w-2/5">
          <h1 className="text-4xl font-bold mb-4">O nas</h1>
          <p className="text-gray-200 text-lg leading-relaxed">
            Od malowniczych uliczek Europy po odległe zakątki świata — wierzymy,
            że każda podróż może stać się historią, którą warto opowiadać.
          </p>
          <div className="bg-[#D6A568] w-20 h-2 mt-4"></div>
        </div>
      </section>
      {/* Historia */}
      <section className="flex flex-col md:flex-row gap-5 items-center justify-between px-6 py-8">
        {/* Zdjęcie */}
        <div className="relative w-full max-w-lg mx-auto aspect-4/3">
          <div className="absolute inset-0 bg-[#D6A568] rounded-[2.5rem] -rotate-6 transform transition-transform duration-300 hover:-rotate-3" />
          <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] rotate-3 shadow-md transform transition-transform duration-300 hover:rotate-1">
            <Image
              src="/about/mediterranean-village.png"
              alt="Z miłości do podróżowania"
              fill
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        {/* Tekst */}
        <div className="w-full md:w-1/2">
          <h1 className="text-[#D6A568] text-xl font-semibold">
            Nasza historia
          </h1>
          <h2 className="text-4xl font-bold">Z miłości do podróżowania</h2>
          <p className="mt-2">
            VELORA powstała z prostej idei — podróżowanie powinno być czymś
            więcej niż odwiedzaniem kolejnych miejsc na mapie. Chcemy, aby każda
            wyprawa pozwalała odkrywać nowe kultury, poznawać ludzi i
            doświadczać świata w autentyczny sposób. Dlatego tworzymy
            przemyślane programy podróży, łączące najpiękniejsze atrakcje z
            mniej oczywistymi zakątkami.
          </p>
        </div>
      </section>
      {/* Dlaczego warto */}
      <section className="flex flex-col justify-center items-center px-6 py-8">
        {/* Tytuł */}
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[#D6A568] text-xl font-semibold">
            Nasze wartości
          </h1>
          <h2 className="text-4xl font-bold">
            Dlaczego warto podróżować z VELORA?
          </h2>
        </div>
        {/* Karty */}
        <Values items={valueData} />
      </section>
      {/* Liczby */}
      <section className="px-6 py-8">
        <div className="bg-[#143B47] rounded-xl text-white p-4 relative h-full w-full -z-10">
          <Image
            src="/about/hills.svg"
            alt="Góry"
            fill
            className="h-full w-full object-cover -z-5"
          />
          <div className="flex items-center justify-center gap-4">
            <Numbers items={numbersData} />
          </div>
        </div>
      </section>
      {/* Ludzie */}
      <section className="flex flex-col justify-center items-center px-6 py-8">
        <h1 className="text-[#D6A568] text-xl font-semibold">Nasz zespół</h1>
        <h2 className="text-4xl font-bold">Ludzie, którzy tworzą VELORA</h2>
        <p className="text-center">
          Podróżnicy, organizatorzy, przewodnicy i doradcy - razem dbamy o to
          aby każda twoja podróży była wyjątkowym doświadczeniem.
        </p>
        <div className="flex items-center justify-center gap-4 w-full md:w-2/3 lg:w-full">
          <People items={peopleData} />
        </div>
      </section>
    </main>
  );
}
