import Link from "next/link";
import { InfoPage, InfoSection } from "@/components/layout/info-page";

export const metadata = { title: "Regulamin demonstracji | VELORA", description: "Zasady korzystania z demonstracyjnej wersji VELORA." };

export default function TermsPage() {
  return (
    <InfoPage title="Regulamin demonstracji" introduction="VELORA to projekt portfolio, w którym można wypróbować katalog wycieczek, konto klienta i proces rezerwacji.">
      <InfoSection title="Katalog i konto">
        <p>Opisy wycieczek, ceny, dostępność i terminy są przykładowe. Katalog oraz blog są dostępne publicznie. Zalogowanie jest wymagane przy zapisywaniu ulubionych, składaniu rezerwacji i korzystaniu z panelu klienta.</p>
        <p>Załóż konto na fikcyjne dane i wybierz hasło używane wyłącznie w tej demonstracji.</p>
      </InfoSection>
      <InfoSection title="Rezerwacje i płatności">
        <p>Rezerwacja powstaje po wybraniu terminu oraz liczby uczestników. Udana symulacja płatności zmienia jej status na „Potwierdzona”. Każdą rezerwację demonstracyjną można anulować w panelu.</p>
        <p>Oferty i potwierdzenia służą wyłącznie prezentacji funkcji projektu. Rezerwacje nie tworzą umowy o udział w wycieczce, a symulacja nie wiąże się z przelewem ani obciążeniem karty.</p>
      </InfoSection>
      <InfoSection title="Zakończenie korzystania z konta">
        <p>Możesz wylogować się w dowolnym momencie. Konto i powiązane z nim zapisy możesz usunąć w zakładce „Moje konto”. Zakres danych opisuje <Link href="/polityka-prywatności" className="font-medium text-blue-950 underline">polityka prywatności</Link>.</p>
      </InfoSection>
    </InfoPage>
  );
}
