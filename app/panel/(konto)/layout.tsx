import { Suspense, type ReactNode } from "react";
import PanelLayout from "@/components/panel/panel-layout";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12" role="status">Ładowanie panelu…</main>}>
      <PanelLayout>{children}</PanelLayout>
    </Suspense>
  );
}
