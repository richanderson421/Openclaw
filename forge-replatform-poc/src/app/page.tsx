import Link from 'next/link';
import { heroBullets, weekEvents } from '@/lib/mock-data';

export default function Home() {
  return (
    <main className="min-h-screen text-slate-900">
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-2xl sm:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Forge Replatform Preview</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Built for players. Designed for busy store nights.</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            A modern customer experience centered on events, product discovery, and community onboarding — optimized for
            mobile and built to scale beyond Crystal Commerce limitations.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/events" className="forge-primary-btn">See This Week&apos;s Events</Link>
            <Link href="/new-player" className="forge-secondary-btn">New Player Guide</Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {heroBullets.map((b) => (
            <div key={b} className="forge-card p-4 text-sm text-slate-700">
              <span className="font-semibold text-orange-600">●</span> {b}
            </div>
          ))}
        </div>

        <section className="forge-card mt-8 p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">This Week at a Glance</h2>
            <Link href="/events" className="text-sm font-semibold text-orange-600 hover:text-orange-700">View all →</Link>
          </div>
          <ul className="mt-4 space-y-2">
            {weekEvents.slice(0, 4).map((e) => (
              <li key={e.id} className="flex items-center justify-between rounded-lg border border-slate-100 p-3 text-sm">
                <span className="text-slate-700">{e.day} · {e.time} — {e.title}</span>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{e.category}</span>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
