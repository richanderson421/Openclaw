import { weekEvents } from '@/lib/mock-data';

export default function EventsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold">Events (POC)</h1>
      <p className="mt-2 text-sm text-zinc-600">Preview structure for a real-time events page connected to Discord + Calendar.</p>

      <div className="mt-6 grid gap-3">
        {weekEvents.map((e) => (
          <article key={e.id} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{e.title}</h2>
              <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs">{e.category}</span>
            </div>
            <p className="mt-1 text-sm text-zinc-600">{e.day} at {e.time}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
