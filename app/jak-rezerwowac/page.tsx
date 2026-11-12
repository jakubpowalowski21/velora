import Link from "next/link";
import { InfoPage, InfoSection } from "@/components/layout/info-page";
import { primaryButton, secondaryButton } from "@/components/panel/panel-ui";

export const metadata = { title: "Jak rezerwować | VELORA", description: "Zobacz, jak wypróbować rezerwację wycieczki i płatność demonstracyjną w VELORA." };

export default function BookingGuidePage() {
  return (
    <InfoPage title="Jak rezerwować" introduction="Wybierz wycieczkę i przejdź przez rezerwację demonstracyjną w kilku krokach.">
      <InfoSection title="1. Wybierz wycieczkę">
        <p>Otwórz katalog, znajdź interesujący Cię kierunek i sprawdź program, cenę oraz terminy. Na stronie wycieczki kliknij „Zarezerwuj wycieczkę”.</p>
      </InfoSection>
      <InfoSection title="2. Zaloguj się lub załóż konto">
        <p>Do rezerwacji i zapisywania wycieczek potrzebujesz konta. Przy rejestracji użyj przykładowej nazwy, adresu e-mail i hasła. Po zalogowaniu wrócisz do wybranej wycieczki.</p>
      </InfoSection>
      <InfoSection title="3. Ustal termin i liczbę uczestników">
        <p>Wybierz datę wyjazdu oraz liczbę osób. Sprawdź łączną kwotę, a następnie przejdź do płatności demo.</p>
      </InfoSection>
      <InfoSection title="4. Wypróbuj płatność i sprawdź status">
        <p>Możesz zasymulować udaną lub odrzuconą płatność. W zakładce „Moje rezerwacje” wrócisz do szczegółów, ponowisz odrzuconą płatność albo anulujesz rezerwację. Symulacja nie pobiera środków.</p>
      </InfoSection>
      <div className="flex flex-wrap gap-3 pt-3">
        <Link href="/wycieczki" className={primaryButton}>Przeglądaj wycieczki</Link>
        <Link href="/panel/moje-rezerwacje" className={secondaryButton}>Moje rezerwacje</Link>
      </div>
    </InfoPage>
  );
}
