import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { blogPosts } from "@/lib/blog";
import { primaryButton } from "@/components/panel/panel-ui";

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((post) => post.slug === slug);
  if (!post) notFound();
  return { title: post.tytul + " | VELORA", description: post.zajawka };
}

export default function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <Suspense fallback={<main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12" role="status">Ładowanie wpisu…</main>}>
      <BlogPost params={params} />
    </Suspense>
  );
}

async function BlogPost({ params }: Pick<PageProps<"/blog/[slug]">, "params">) {
  const { slug } = await params;
  const post = blogPosts.find((post) => post.slug === slug);
  if (!post) notFound();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:py-12">
      <Link href="/blog" className="text-sm font-medium text-gray-500 hover:text-blue-950">← Blog podróżniczy</Link>
      <article className="mt-5">
        <header className="mb-7">
          <p className="text-sm font-semibold text-[#143B47]">{post.kategoria}</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">{post.tytul}</h1>
          <p className="mt-4 max-w-2xl leading-7 text-gray-600 sm:text-lg">{post.zajawka}</p>
        </header>
        {post.tour && (
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#143B47] sm:aspect-[16/7]">
            <Image src={post.tour.zdjecie} alt="" fill priority sizes="(max-width: 1024px) 100vw, 976px" className="object-cover" />
          </div>
        )}
        <div className="mt-8 max-w-3xl space-y-7">
          {post.sekcje.map((section) => (
            <section key={section.tytul}>
              <h2 className="text-xl font-semibold text-gray-900">{section.tytul}</h2>
              <p className="mt-3 leading-8 text-gray-700">{section.tekst}</p>
            </section>
          ))}
          {post.tour && (
            <aside className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
              <p className="text-sm font-medium text-gray-600">Wycieczka z katalogu VELORA</p>
              <h2 className="mb-4 mt-1 text-xl font-semibold">{post.tour.nazwa}</h2>
              <Link href={"/wycieczki/" + post.tour.slug} className={primaryButton}>Zobacz wycieczkę</Link>
            </aside>
          )}
        </div>
      </article>
    </main>
  );
}
