import Link from 'next/link';
import { featuredProducts, gameCategories, weekEvents } from '@/lib/mock-data';
import { getShopifyFeaturedProducts, getShopifyProductUrl } from '@/lib/shopify';

export async function HomeExperience() {
  const shopifyProducts = await getShopifyFeaturedProducts(4);
  const products = shopifyProducts.length
    ? shopifyProducts.map((p) => ({
        id: p.id,
        title: p.title,
        price: `$${p.price}`,
        badge: 'New In Stock' as const,
        category: 'Store' as const,
        url: getShopifyProductUrl(p.handle),
      }))
    : featuredProducts.slice(0, 4).map((p) => ({ ...p, url: '/categories/mtg' }));

  const filteredEvents = weekEvents.slice(0, 3);

  return (
    <>
      <section className="mb-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Game interests</p>
        <div className="flex flex-wrap gap-2">
          {gameCategories.map((cat) => (
            <span key={cat} className="rounded-full border border-orange-600 bg-orange-100 px-3 py-1.5 text-sm font-semibold text-orange-800">
              {cat}
            </span>
          ))}
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
          <Link href="/events" className="forge-primary-btn">See This Week&apos;s Events</Link>
          <Link href="/new-player" className="forge-secondary-btn">New Player Guide</Link>
        </div>
      </div>

      <section className="forge-card mt-6 p-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">New In-Store Highlights</h2>
          <Link href="/categories/mtg" className="text-sm font-semibold text-orange-600 hover:text-orange-700">Browse game categories →</Link>
        </div>
        <ul className="space-y-2">
          {products.map((p) => (
            <li key={p.id} className="flex items-center justify-between rounded-lg border border-slate-100 p-3 text-sm">
              <div>
                <a href={p.url} className="font-semibold text-slate-800 hover:text-orange-700" target="_blank" rel="noreferrer">
                  {p.title}
                </a>
                <p className="text-xs text-slate-500">{p.category}</p>
              </div>
              <div className="text-right">
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${p.badge === 'Preorder' ? 'bg-violet-100 text-violet-700' : 'bg-emerald-100 text-emerald-700'}`}>
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
          <Link href="/events" className="text-sm font-semibold text-orange-600 hover:text-orange-700">Full calendar →</Link>
        </div>
        <ul className="space-y-2">
          {filteredEvents.map((e) => (
            <li key={e.id} className="flex items-center justify-between rounded-lg border border-slate-100 p-3 text-sm">
              <span className="text-slate-700">{e.day} · {e.time} — {e.title}</span>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{e.category}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
