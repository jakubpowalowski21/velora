import Link from "next/link";
import { InfoPage, InfoSection } from "@/components/layout/info-page";

export const metadata = { title: "Polityka prywatności | VELORA", description: "Informacje o danych kont i pliku sesji w demonstracji VELORA." };

export default function PrivacyPage() {
  return (
    <InfoPage title="Polityka prywatności" introduction="Ta strona opisuje dane zapisywane podczas korzystania z demonstracyjnego panelu VELORA. Do testów użyj fikcyjnych danych.">
      <InfoSection title="Dane konta">
        <p>Panel zapisuje nazwę wyświetlaną, adres e-mail i skrót hasła. Adres służy do logowania. Z kontem powiązane są identyfikatory ulubionych wycieczek oraz szczegóły rezerwacji, w tym termin, liczba uczestników, kwota i status.</p>
      </InfoSection>
      <InfoSection title="Plik cookie sesji">
        <p>Po zalogowaniu przeglądarka otrzymuje plik cookie sesji, dzięki któremu panel rozpoznaje konto podczas kolejnych wizyt. Sesja wygasa po siedmiu dniach, a wylogowanie kończy ją wcześniej.</p>
      </InfoSection>
      <InfoSection title="Symulacja płatności">
        <p>W bazie zapisuje się wynik symulacji. Panel nie zbiera danych karty ani konta bankowego i nie przekazuje danych operatorowi płatności.</p>
      </InfoSection>
      <InfoSection title="Zmiana i usunięcie danych">
        <p>W zakładce <Link href="/panel/profil" className="font-medium text-blue-950 underline">Moje konto</Link> możesz zmienić nazwę i hasło lub usunąć konto. Usunięcie obejmuje dane konta, aktywne sesje, ulubione oraz rezerwacje demonstracyjne.</p>
      </InfoSection>
    </InfoPage>
  );
}
