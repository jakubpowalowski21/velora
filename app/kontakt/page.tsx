import { Mail, Phone, Clock, Send, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FAQ, FAQItem } from "@/components/contact/faq";

export const metadata = {
  title: "Kontakt | VELORA",
  description: "Sprawdź dostępne metody kontaktu z obsługą VELORA",
};

export default function ContactPage() {
  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Jak mogę zarezerwować wycieczkę?",
      answer:
        "Wybierz interesującą Cię wycieczkę, wskaż dostępny termin i liczbę uczestników, a następnie przejdź przez proces rezerwacji. Potwierdzenie znajdziesz na swoim koncie.",
    },
    {
      id: 2,
      question: "Czy mogę anulować rezerwację?",
      answer:
        "Tak. Otwórz szczegóły wyjazdu w zakładce Moje rezerwacje i wybierz Anuluj rezerwację. Anulowanie w wersji demonstracyjnej jest bezpłatne.",
    },
    {
      id: 3,
      question: "Czy mogę zmienić termin wycieczki?",
      answer:
        "Aby wybrać inny termin w wersji demonstracyjnej, anuluj bieżącą rezerwację i zarezerwuj wycieczkę ponownie.",
    },
    {
      id: 4,
      question: "Czy muszę mieć konto aby zarezerwować wycieczkę?",
      answer:
        "W platformie VELORA konto jest wymagane do finalizacji rezerwacji. Pozwala to zarządzać wyjazdami i sprawdzać ich status.",
    },
    {
      id: 5,
      question: "Gdzie znajdę szczegóły swojej rezerwacji?",
      answer:
        "Po zalogowaniu przejdź do zakładki Moje rezerwacje w panelu użytkownika.",
    },
  ];

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="mx-6 my-12">
        <h1 className="text-4xl font-bold">
          Porozmawiajmy o Twojej następnej podróży
        </h1>
        <p className="mt-4">
          Masz pytania dotyczące naszych wycieczek, rezerwacji lub planowania
          podróży? Jesteśmy tutaj, aby pomóc Ci odkrywać świat bez zmartwień.
        </p>
      </section>
      {/* Kontakt i formularz */}
      <section className="bg-[#143B47] px-6 py-8">
        <div className="flex-row md:flex gap-4 rounded-2xl   shadow-black shadow-inner bg-white px-5 py-4">
          {/* Kolumna 1 */}
          <div className="w-full md:w-2/5">
            <h2 className="text-3xl font-semibold">Skontaktuj się z nami</h2>
            <p>Wybierz najwygodniejszą formę kontaktu.</p>
            {/* Dane kontaktowe */}
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <Mail />
                <div>
                  <p className="text-xl font-semibold">Adres e-mail</p>
                  <a href="mailto:kontakt@velora.example">
                    kontakt@velora.example
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Phone />
                <div>
                  <p className="text-xl font-semibold">Telefon</p>
                  <a href="tel:+48 000 000 000">+48 000 000 000</a>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Clock />
                <div>
                  <p className="text-xl font-semibold">Godziny kontaktu</p>
                  <p>
                    Pon.–Pt.: 9:00–17:00 <br /> Sob.–Niedz.: nieczynne
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-5">
              Dane kontaktowe są przykładowe i służą do prezentacji projektu.
            </p>
          </div>
          {/* Kolumna 2 */}
          <div className="mt-6 md:mt-0 w-full md:w-3/5">
            <h2 className="text-3xl font-semibold">Wyślij wiadomość</h2>
            <p>Wypełnij formularz, a nasz zespół skontaktuje się z Tobą.</p>
            {/* Formularz */}
            <div className="mt-4">
              <form className="border-2 border-gray-500 rounded-xl p-4 w-full box-border flex flex-col gap-4">
                {/* Imię i nazwisko */}
                <label className="font-semibold flex flex-col gap-1 w-full box-border">
                  Imię i nazwisko *
                  <input
                    type="text"
                    placeholder="Jan Kowalski"
                    required
                    className="w-full box-border placeholder:text-gray-500 border border-gray-500 hover:border-blue-500 focus:border-blue-500 focus:outline-none rounded-md p-2 font-normal"
                  />
                </label>

                {/* Adres e-mail */}
                <label className="font-semibold flex flex-col gap-1 w-full box-border">
                  Adres e-mail *
                  <input
                    type="email"
                    placeholder="jan@example.com"
                    required
                    className="w-full box-border placeholder:text-gray-500 border border-gray-500 hover:border-blue-500 focus:border-blue-500 focus:outline-none rounded-md p-2 font-normal"
                  />
                </label>

                {/* Temat wiadomości */}
                <label className="font-semibold flex flex-col gap-1 w-full box-border">
                  Temat wiadomości *
                  <select
                    required
                    defaultValue=""
                    className="w-full box-border border border-gray-500 hover:border-blue-500 focus:border-blue-500 focus:outline-none rounded-md p-2 font-normal bg-white"
                  >
                    <option value="" disabled hidden>
                      -- Wybierz opcję --
                    </option>
                    <option value="Pytanie o wycieczkę">
                      Pytanie o wycieczkę
                    </option>
                    <option value="Moja rezerwacja">Moja rezerwacja</option>
                    <option value="Zmiana terminu">Zmiana terminu</option>
                    <option value="Współpraca">Współpraca</option>
                    <option value="Inne">Inne</option>
                  </select>
                </label>

                {/* Numer rezerwacji */}
                <label className="font-semibold flex flex-col gap-1 w-full box-border">
                  Numer rezerwacji
                  <input
                    type="text"
                    placeholder="VEL-2027-001 (opcjonalnie)"
                    className="w-full box-border placeholder:text-gray-500 border border-gray-500 hover:border-blue-500 focus:border-blue-500 focus:outline-none rounded-md p-2 font-normal"
                  />
                </label>

                {/* Wiadomość */}
                <label className="font-semibold flex flex-col gap-1 w-full box-border">
                  Wiadomość *
                  <textarea
                    placeholder="W czym możemy pomóc..."
                    required
                    className="w-full max-w-full box-border placeholder:text-gray-500 border border-gray-500 hover:border-blue-500 focus:border-blue-500 focus:outline-none rounded-md p-2 font-normal resize-y"
                  ></textarea>
                </label>

                {/* Polityka prywatności */}
                <div className="flex items-start gap-2 w-full box-border">
                  <input
                    type="checkbox"
                    id="polityka"
                    name="polityka"
                    required
                    className="mt-1 shrink-0"
                  />
                  <label
                    htmlFor="polityka"
                    className="font-normal text-sm cursor-pointer"
                  >
                    Zapoznałem się z{" "}
                    <Link
                      href="/polityka-prywatności"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      polityką prywatności
                    </Link>{" "}
                    i akceptuję jej treść.
                  </label>
                </div>

                {/* Przycisk */}
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-500 text-white px-4 py-2.5 rounded-md hover:bg-blue-500 cursor-pointer active:translate-y-0.5 transition-transform duration-100 box-border font-semibold"
                >
                  <span>Wyślij wiadomość</span>
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="bg-[#143B47] px-6 py-8 text-white flex flex-col justify-center w-full">
        <h3 className="text-4xl font-bold flex justify-center">
          Twoja następna przygoda czeka!
        </h3>
        <p className="flex justify-center mt-4">
          Odkryj wyjątkowe miejsca i znajdź podróż, którą zapamiętasz na długo.
        </p>
        <Link
          href="/wycieczki"
          className="flex gap-3 justify-center mt-4 px-4 py-2.5 bg-gray-500 rounded-md hover:bg-blue-500 cursor-pointer active:transform-y-0.5 transition-transform duration-100"
        >
          <p>Odkryj wycieczki</p> <ArrowRight />
        </Link>
      </section>
      {/* FAQ */}
      <section id="FAQ" className="bg-white px-6 py-8">
        <FAQ items={faqData} />
      </section>
    </main>
  );
}
