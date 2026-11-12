import { Suspense } from "react";
import { AuthForm } from "@/components/panel/auth-form";

export const metadata = { title: "Rejestracja | VELORA" };

export default function RegisterPage() {
  return (
    <Suspense fallback={<main className="mx-auto w-full max-w-xl flex-1 px-6 py-12" role="status">Ładowanie rejestracji…</main>}>
      <AuthForm register />
    </Suspense>
  );
}
