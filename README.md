This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Panel demonstracyjny

Panel wymaga Node.js 22.13 lub nowszego. Po uruchomieniu aplikacji otwórz
`/panel`, załóż konto na fikcyjne dane i wybierz wycieczkę z katalogu.
Płatność można potwierdzić lub odrzucić w symulatorze.

Aplikacja tworzy lokalną bazę SQLite w `.velora/panel.sqlite`. Przy wdrożeniu
ustaw opcjonalne `VELORA_DB_PATH` na plik na trwałym dysku zapisywalnym przez
serwer Node.js. Używaj HTTPS w trybie produkcyjnym, ponieważ plik cookie sesji
ma wtedy atrybut Secure.
