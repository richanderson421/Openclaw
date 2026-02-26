import Link from 'next/link';
import {
  categoryLabel,
  detectCategory,
  formatEtDayLabel,
  formatEventDateTime,
  getDiscordScheduledEvents,
  groupByEtDate,
  isHappeningNow,
  type EventCategory,
} from '@/lib/events';

export const revalidate = 300;

const filterOrder: EventCategory[] = [
  'mtg',
  'pokemon',
  'onepiece',
  'swu',
  'lorcana',
  'warhammer',
  'fab',
  'boardgames',
  'other',
];

const chipColor: Record<EventCategory, string> = {
  mtg: 'bg-rose-100 text-rose-700',
  pokemon: 'bg-yellow-100 text-yellow-800',
  onepiece: 'bg-sky-100 text-sky-700',
  swu: 'bg-indigo-100 text-indigo-700',
  lorcana: 'bg-fuchsia-100 text-fuchsia-700',
  warhammer: 'bg-slate-200 text-slate-800',
  fab: 'bg-orange-100 text-orange-700',
  boardgames: 'bg-emerald-100 text-emerald-700',
  other: 'bg-zinc-200 text-zinc-700',
};

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ filter?: string }>;
}) {
  let events = [] as Awaited<ReturnType<typeof getDiscordScheduledEvents>>;
  let error: string | null = null;

  const params = searchParams ? await searchParams : undefined;
  const selected = (params?.filter as EventCategory | undefined) || 'all';

  try {
    events = await getDiscordScheduledEvents(7);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unable to load events';
  }

  const withCategory = events.map((event) => ({
    ...event,
    category: detectCategory(event.title),
  }));

  const availableCategories = new Set(withCategory.map((e) => e.category));
  const filtered = selected === 'all' ? withCategory : withCategory.filter((e) => e.category === selected);

  const grouped = groupByEtDate(filtered);
  const dayKeys = Object.keys(grouped).sort();

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <header className="mb-6 rounded-2xl bg-zinc-900 p-5 text-white shadow-lg sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Forge Games & Hobbies</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">What&apos;s Happening This Week</h1>
          <p className="mt-2 text-sm text-zinc-300">Updated every 5 minutes • Times shown in ET</p>
        </header>

        <section className="mb-6">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            <FilterChip current={selected} value="all" label="All" />
            {filterOrder
              .filter((cat) => availableCategories.has(cat))
              .map((cat) => (
                <FilterChip key={cat} current={selected} value={cat} label={categoryLabel[cat]} className={chipColor[cat]} />
              ))}
          </div>
        </section>

        {error ? (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            Couldn&apos;t load events right now. Please refresh in a minute.
            <div className="mt-2 text-xs opacity-80">{error}</div>
          </div>
        ) : null}

        {!error && filtered.length === 0 ? (
          <div className="rounded-xl border bg-white p-5 text-zinc-700 shadow-sm">No events found for this filter in the next 7 days.</div>
        ) : null}

        <div className="space-y-4">
          {dayKeys.map((dayKey) => (
            <section key={dayKey} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5">
              <h2 className="mb-3 text-base font-semibold text-zinc-900 sm:text-lg">{formatEtDayLabel(dayKey)}</h2>
              <ul className="space-y-3">
                {grouped[dayKey].map((event) => {
                  const live = isHappeningNow(event);
                  const category = detectCategory(event.title);
                  return (
                    <li key={event.id} className="rounded-xl border border-zinc-200 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-medium text-zinc-900">{event.title}</p>
                          <p className="text-sm text-zinc-600">{formatEventDateTime(event.startsAt)}</p>
                          {event.location ? <p className="mt-1 truncate text-xs text-zinc-500">📍 {event.location}</p> : null}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${chipColor[category]}`}>{categoryLabel[category]}</span>
                          {live ? (
                            <span className="rounded-full bg-green-100 px-2 py-1 text-[11px] font-semibold text-green-700">Live now</span>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

function FilterChip({
  current,
  value,
  label,
  className,
}: {
  current: string;
  value: string;
  label: string;
  className?: string;
}) {
  const active = current === value;
  return (
    <Link
      href={value === 'all' ? '/' : `/?filter=${value}`}
      className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-sm font-medium transition ${
        active
          ? 'border-zinc-900 bg-zinc-900 text-white'
          : `border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 ${className || ''}`
      }`}
    >
      {label}
    </Link>
  );
}
