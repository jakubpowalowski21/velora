"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Newsletter from "@/components/ui/newsletter";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const [followed, setFollowed] = useState(false);
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <>
      <footer className="bg-[#143B47] text-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <Newsletter />
        <hr className="my-6 border-t border-gray-500 justify-center" />
        <div className="flex gap-4 text-sm">
          {/* Pierwsza kolumna */}
          <div className="w-1/2 flex flex-col justify-between">
            {/* Sekcja 1 */}
            <div className="flex-1">
              <Image
                src="logo-white.svg"
                alt="Logo"
                width={120}
                height={40}
                priority
              />
              <p>Świat zaczyna się tam gdzie kończy się codzienność.</p>
              <div className="flex gap-2 mt-2">
                <FaInstagram className="w-5 h-5 cursor-pointer" />
                <FaFacebook className="w-5 h-5 cursor-pointer" />
                <FaYoutube className="w-5 h-5 cursor-pointer" />
              </div>
            </div>
            {/* Sekcja 2 */}
            <div className="mt-3">
              <h1 className="font-semibold text-xl mb-2">VELORA</h1>
              <div className="flex flex-col gap-1">
                <Link href="/o-nas">O nas</Link>
                <Link href="/blog">Blog podróżniczy</Link>
                <Link href="/kontakt">Kontakt</Link>
                <Link href="/kontakt#FAQ">Najczęstsze pytania</Link>
              </div>
            </div>
          </div>
          {/* Druga kolumna */}
          <div className="w-1/2 flex flex-col justify-between">
            {/* Sekcja 1 */}
            <div className="flex-1">
              <h1 className="font-semibold text-xl mb-2">Odkrywaj</h1>
              <div className="flex flex-col gap-1">
                <Link href="/wycieczki">Wszystkie wycieczki</Link>
                <Link href="/wycieczki?kontynent=Europa">Europa</Link>
                <Link href="/wycieczki?kontynent=Azja">Azja</Link>
                <Link href="/wycieczki?kontynent=Afryka">Afryka</Link>
                <Link href="/wycieczki?kontynent=Ameryka">Ameryka</Link>
                <Link href="/wycieczki?kontynent=Oceania">Oceania</Link>
              </div>
            </div>
            {/* Sekcja 2 */}
            <div className="mt-3">
              <h1 className="font-semibold text-xl mb-2">Pomoc i informacje</h1>
              <div className="flex flex-col gap-1">
                <Link href="/panel/moje-rezerwacje">Moje rezerwacje</Link>
                <Link href="/jak-rezerwować">Jak rezerwować</Link>
                <Link href="/regulamin">Regulamin</Link>
                <Link href="/polityka-prywatności">Polityka prywatności</Link>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-t border-gray-500 justify-center" />
        <div className="flex justify-center">
          <p>&copy; {year} VELORA. Wszelkie prawa zastrzeżone.</p>
        </div>
        <div className="flex justify-center mt-2">
          <p className="text-xs">
            Projekt demonstracyjny stworzony na potrzeby portfolio. Oferty i
            rezerwacje są fikcyjne.
          </p>
        </div>
      </footer>
    </>
  );
}
