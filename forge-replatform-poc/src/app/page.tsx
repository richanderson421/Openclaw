import Link from 'next/link';
import { heroBullets, weekEvents } from '@/lib/mock-data';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl bg-zinc-900 p-8 text-white shadow-xl">
          <p className="text-xs uppercase tracking-widest text-zinc-300">Forge Replatform POC</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">A cleaner, faster customer experience for The Forge</h1>
          <p className="mt-3 max-w-2xl text-zinc-300">
            This preview demonstrates the front-end direction: events-forward navigation, clearer calls to action,
            and mobile-first usability.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/events" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900">See This Week&apos;s Events</Link>
            <Link href="/new-player" className="rounded-full border border-zinc-500 px-4 py-2 text-sm font-semibold">New Player Guide</Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {heroBullets.map((b) => (
            <div key={b} className="rounded-xl border border-zinc-200 bg-white p-4 text-sm shadow-sm">✅ {b}</div>
          ))}
        </div>

        <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">This Week at a Glance</h2>
          <ul className="mt-4 space-y-2">
            {weekEvents.slice(0, 4).map((e) => (
              <li key={e.id} className="flex items-center justify-between rounded-lg border border-zinc-100 p-3 text-sm">
                <span>{e.day} · {e.time} — {e.title}</span>
                <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs">{e.category}</span>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
