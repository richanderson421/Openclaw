import { weekEvents } from '@/lib/mock-data';

const categoryColors: Record<string, string> = {
  MTG: 'bg-rose-100 text-rose-700',
  Pokemon: 'bg-amber-100 text-amber-800',
  'One Piece': 'bg-sky-100 text-sky-700',
  SWU: 'bg-indigo-100 text-indigo-700',
  Riftbound: 'bg-violet-100 text-violet-700',
  Lorcana: 'bg-fuchsia-100 text-fuchsia-700',
};

export default function EventsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="forge-card p-5 sm:p-6">
        <h1 className="text-2xl font-bold">Events This Week</h1>
        <p className="mt-2 text-sm text-slate-600">POC layout for real-time events connected to Discord + Calendar.</p>
      </div>

      <div className="mt-4 grid gap-3">
        {weekEvents.map((e) => (
          <article key={e.id} className="forge-card p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold text-slate-900">{e.title}</h2>
              <span className={`rounded-full px-2 py-1 text-xs font-semibold ${categoryColors[e.category] || 'bg-slate-100 text-slate-700'}`}>
                {e.category}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-600">{e.day} at {e.time}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
