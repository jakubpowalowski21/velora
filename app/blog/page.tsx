import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog podróżniczy | VELORA",
  description: "Pomysły na spacery, lokalne smaki i kontakt z przyrodą podczas podróży po świecie.",
};

export default function BlogPage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <header className="mb-8 max-w-2xl sm:mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">Blog podróżniczy</h1>
        <p className="mt-4 leading-7 text-gray-600 sm:text-lg">Pomysły na spokojniejsze zwiedzanie, lokalne smaki i chwile blisko natury.</p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article key={post.slug} className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:border-[#D6A568] hover:shadow-md">
            <Link href={"/blog/" + post.slug} className="flex flex-1 flex-col focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-950">
              <div className="relative aspect-video overflow-hidden bg-[#143B47]">
                {post.tour && <Image src={post.tour.zdjecie} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover" />}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold text-[#143B47]">{post.kategoria}</p>
                <h2 className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-[#143B47]">{post.tytul}</h2>
                <p className="mb-4 mt-2 flex-1 text-sm leading-6 text-gray-600">{post.zajawka}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-950" aria-hidden="true">
                  Czytaj wpis <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
