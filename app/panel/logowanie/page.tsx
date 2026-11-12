import { Suspense } from "react";
import { AuthForm } from "@/components/panel/auth-form";

export const metadata = { title: "Logowanie | VELORA" };

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="mx-auto w-full max-w-xl flex-1 px-6 py-12" role="status">Ładowanie logowania…</main>}>
      <AuthForm />
    </Suspense>
  );
}
