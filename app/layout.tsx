import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { PanelProvider } from "@/components/panel/panel-provider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "VELORA",
  description: "Agencja zajmójąca się organizacją wycieczek na całym świecie",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${poppins.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <PanelProvider>
          <Header />
          {children}
          <Footer />
        </PanelProvider>
      </body>
    </html>
  );
}
