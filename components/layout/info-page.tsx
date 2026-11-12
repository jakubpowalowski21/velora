import Link from "next/link";
import type { ReactNode } from "react";

export function InfoPage({ title, introduction, children }: {
  title: string;
  introduction: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:py-12">
      <Link href="/" className="text-sm font-medium text-gray-500 hover:text-blue-950">← Strona główna</Link>
      <header className="mb-8 mt-5">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>
        <p className="mt-4 leading-7 text-gray-600">{introduction}</p>
      </header>
      <div className="space-y-4">{children}</div>
    </main>
  );
}

export function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <div className="mt-3 space-y-3 leading-7 text-gray-700">{children}</div>
    </section>
  );
}
