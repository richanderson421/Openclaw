'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { gameCategories, type EventItem, type GameCategory } from '@/lib/mock-data';

type ProductCard = {
  id: string;
  title: string;
  price: string;
  badge: 'Preorder' | 'New In Stock';
  category: GameCategory;
  url: string;
};

function inferCategory(title: string): GameCategory {
  const t = title.toLowerCase();
  if (t.includes('one piece')) return 'One Piece';
  if (t.includes('pokemon')) return 'Pokemon';
  if (t.includes('star wars') || t.includes('swu')) return 'SWU';
  if (t.includes('riftbound') || t.includes('nexus')) return 'Riftbound';
  if (t.includes('lorcana')) return 'Lorcana';
  return 'MTG';
}

export function HomeExperienceClient({ initialProducts, events }: { initialProducts: ProductCard[]; events: EventItem[] }) {
  const [enabled, setEnabled] = useState<GameCategory[]>([...gameCategories]);

  const products = useMemo(
    () => initialProducts.map((p) => ({ ...p, category: p.category || inferCategory(p.title) })),
    [initialProducts],
  );

  const filteredProducts = useMemo(
    () => products.filter((p) => enabled.includes(p.category)).slice(0, 4),
    [products, enabled],
  );

  const filteredEvents = useMemo(() => events.filter((e) => enabled.includes(e.category)).slice(0, 3), [events, enabled]);

  const toggle = (cat: GameCategory) => {
    setEnabled((curr) => (curr.includes(cat) ? curr.filter((c) => c !== cat) : [...curr, cat]));
  };

  return (
    <>
      <section className="mb-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Game interests</p>
        <div className="flex flex-wrap gap-2">
          {gameCategories.map((cat) => {
            const active = enabled.includes(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggle(cat)}
                className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
                  active ? 'border-orange-600 bg-orange-100 text-orange-800' : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-2xl sm:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Forge Replatform Preview</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Find your next game night at The Forge</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Built to help customers decide to visit in person: what&apos;s happening this week, what&apos;s new in-store, and where to start
          if you&apos;re brand new.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/events" className="forge-primary-btn">
            See This Week&apos;s Events
          </Link>
          <Link href="/new-player" className="forge-secondary-btn">
            New Player Guide
          </Link>
        </div>
      </div>

      <section className="forge-card mt-6 p-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">New In-Store Highlights</h2>
          <Link href="/categories/mtg" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
            Browse game categories →
          </Link>
        </div>
        <ul className="space-y-2">
          {filteredProducts.map((p) => (
            <li key={p.id} className="flex items-center justify-between rounded-lg border border-slate-100 p-3 text-sm">
              <div>
                <a href={p.url} className="font-semibold text-slate-800 hover:text-orange-700" target="_blank" rel="noreferrer">
                  {p.title}
                </a>
                <p className="text-xs text-slate-500">{p.category}</p>
              </div>
              <div className="text-right">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    p.badge === 'Preorder' ? 'bg-violet-100 text-violet-700' : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {p.badge}
                </span>
                <p className="mt-1 font-bold text-slate-800">{p.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="forge-card mt-6 p-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Upcoming Events (quick view)</h2>
          <Link href="/events" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
            Full calendar →
          </Link>
        </div>
        <ul className="space-y-2">
          {filteredEvents.map((e) => (
            <li key={e.id} className="flex items-center justify-between rounded-lg border border-slate-100 p-3 text-sm">
              <span className="text-slate-700">
                {e.day} · {e.time} — {e.title}
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{e.category}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
