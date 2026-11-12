"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { Heart, User, Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";

const navigation = [
  { name: "Wycieczki", href: "/wycieczki" },
  { name: "O nas", href: "/o-nas" },
  { name: "Kontakt", href: "/kontakt" },
];

function DesktopNavigation({ pathname = "" }: { pathname?: string }) {
  const isActive = (href: string, pathname: string) => {
    const cleanPathname = pathname.replace(/^\/velora/, "") || "/";

    if (href === "/") {
      return cleanPathname === "/";
    }

    return cleanPathname.startsWith(href);
  };

  return (
    <nav className="hidden md:flex items-center gap-8">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={"text-xl font-medium transition-colors hover:text-[#D6A568] " +
            (isActive(item.href, pathname) ? "text-[#D6A568] underline underline-offset-8" : "text-gray-700")}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}

function ActiveNavigation() {
  return <DesktopNavigation pathname={usePathname()} />;
}

export default function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 w-full h-20 bg-white shadow-md flex items-center justify-between px-6 md:px-12 z-50">
        {/* Logo po lewej stronie z zachowaniem odstępu od krawędzi */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="Logo" width={120} height={40} priority />
        </Link>

        {/* Nawigacja wyśrodkowana */}
        <Suspense fallback={<DesktopNavigation />}>
          <ActiveNavigation />
        </Suspense>

        {/* Ikony po prawej stronie */}
        <div className="flex items-center gap-0.1">
          <Link
            href="/ulubione"
            aria-label="Ulubione wycieczki"
            className="p-2 text-black transition-colors hover:text-[#D6A568]"
          >
            <Heart className="w-6 h-6" />
          </Link>
          <Link
            href="/panel"
            aria-label="Panel klienta"
            className="p-2 text-black transition-colors hover:text-[#D6A568]"
          >
            <User className="w-6 h-6" />
          </Link>

          {/* Menu mobilne */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger className="p-2 text-black transition-colors hover:text-[#D6A568]">
                <Menu className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent>
                <nav className="mt-8 flex flex-col gap-6 px-4">
                  {navigation.map((item) => (
                    <SheetClose key={item.href}>
                      <Link
                        href={item.href}
                        className="text-lg font-medium transition-colors hover:text-gray-500"
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      {/* Spacer zapobiegający podwijaniu się treści pod fixed header */}
      <div className="w-full h-20"></div>
    </>
  );
}
