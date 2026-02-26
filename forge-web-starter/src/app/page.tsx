import {
  formatEtDayLabel,
  formatEventDateTime,
  getDiscordScheduledEvents,
  groupByEtDate,
  isHappeningNow,
} from '@/lib/events';

export const revalidate = 300;

export default async function HomePage() {
  let events = [] as Awaited<ReturnType<typeof getDiscordScheduledEvents>>;
  let error: string | null = null;

  try {
    events = await getDiscordScheduledEvents(7);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unable to load events';
  }

  const grouped = groupByEtDate(events);
  const dayKeys = Object.keys(grouped).sort();

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-8 sm:px-6">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Forge Games & Hobbies</p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">What&apos;s Happening This Week</h1>
        <p className="mt-2 text-zinc-600">Customer event view • Updated every 5 minutes • Times shown in ET</p>
      </header>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          Couldn&apos;t load events right now. Please refresh in a minute.
          <div className="mt-2 text-xs opacity-80">{error}</div>
        </div>
      ) : null}

      {!error && events.length === 0 ? (
        <div className="rounded-xl border bg-white p-5 text-zinc-700 shadow-sm">No scheduled events in the next 7 days.</div>
      ) : null}

      <div className="space-y-6">
        {dayKeys.map((dayKey) => (
          <section key={dayKey} className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900">{formatEtDayLabel(dayKey)}</h2>
            <ul className="space-y-3">
              {grouped[dayKey].map((event) => {
                const live = isHappeningNow(event);
                return (
                  <li key={event.id} className="rounded-lg border border-zinc-200 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-zinc-900">{event.title}</p>
                        <p className="text-sm text-zinc-600">{formatEventDateTime(event.startsAt)}</p>
                        {event.location ? <p className="mt-1 text-sm text-zinc-500">📍 {event.location}</p> : null}
                      </div>
                      {live ? (
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">Happening now</span>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
