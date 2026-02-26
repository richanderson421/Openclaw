import type { Metadata } from 'next';
import Link from 'next/link';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Forge Replatform POC',
  description: 'Preview of a modern frontend replacement for The Forge website',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/90 backdrop-blur">
          <nav className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3 text-sm sm:px-6">
            <Link href="/" className="font-semibold">Forge POC</Link>
            <Link href="/events" className="text-zinc-600 hover:text-zinc-900">Events</Link>
            <Link href="/categories/mtg" className="text-zinc-600 hover:text-zinc-900">Categories</Link>
            <Link href="/new-player" className="text-zinc-600 hover:text-zinc-900">New Player</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
