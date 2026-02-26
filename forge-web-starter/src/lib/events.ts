import { formatInTimeZone } from 'date-fns-tz';

export type EventCategory =
  | 'mtg'
  | 'riftbound'
  | 'pokemon'
  | 'onepiece'
  | 'swu'
  | 'lorcana'
  | 'warhammer'
  | 'fab'
  | 'boardgames'
  | 'other';

export type StoreEvent = {
  id: string;
  title: string;
  startsAt: string;
  endsAt?: string;
  location?: string;
};

const DEFAULT_GUILD_ID = '1278178261037486181';
const TIMEZONE = 'America/New_York';

type DiscordScheduledEvent = {
  id: string;
  name: string;
  scheduled_start_time: string;
  scheduled_end_time?: string | null;
  entity_metadata?: {
    location?: string;
  };
};

export async function getDiscordScheduledEvents(days = 7): Promise<StoreEvent[]> {
  const token = process.env.DISCORD_BOT_TOKEN;
  const guildId = process.env.DISCORD_GUILD_ID || DEFAULT_GUILD_ID;

  if (!token) {
    throw new Error('Missing DISCORD_BOT_TOKEN env var');
  }

  const res = await fetch(
    `https://discord.com/api/v10/guilds/${guildId}/scheduled-events?with_user_count=false`,
    {
      headers: {
        Authorization: `Bot ${token}`,
        'User-Agent': 'forge-web-starter',
      },
      next: { revalidate: 300 },
    },
  );

  if (!res.ok) {
    throw new Error(`Discord API failed: ${res.status}`);
  }

  const data = (await res.json()) as DiscordScheduledEvent[];
  const now = new Date();
  const end = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  return data
    .filter((e) => e.scheduled_start_time)
    .map((e) => ({
      id: e.id,
      title: e.name as string,
      startsAt: e.scheduled_start_time as string,
      endsAt: (e.scheduled_end_time as string) || undefined,
      location: (e.entity_metadata?.location as string) || undefined,
    }))
    .filter((e) => {
      const d = new Date(e.startsAt);
      return d >= now && d < end;
    })
    .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt));
}

export function formatEventDateTime(iso: string): string {
  return formatInTimeZone(new Date(iso), TIMEZONE, 'EEE, MMM d • h:mm a zzz');
}

export function isHappeningNow(event: StoreEvent): boolean {
  const start = +new Date(event.startsAt);
  const end = event.endsAt ? +new Date(event.endsAt) : start + 2 * 60 * 60 * 1000;
  const now = Date.now();
  return now >= start && now <= end;
}

export function groupByEtDate(events: StoreEvent[]): Record<string, StoreEvent[]> {
  return events.reduce<Record<string, StoreEvent[]>>((acc, event) => {
    const key = formatInTimeZone(new Date(event.startsAt), TIMEZONE, 'yyyy-MM-dd');
    acc[key] ||= [];
    acc[key].push(event);
    return acc;
  }, {});
}

export function formatEtDayLabel(dateKey: string): string {
  const [year, month, day] = dateKey.split('-').map(Number);
  const middayUtc = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  return formatInTimeZone(middayUtc, TIMEZONE, 'EEEE, MMM d');
}

export function detectCategory(title: string): EventCategory {
  const t = title.toLowerCase();
  if (t.includes('nexus night') || t.includes('riftbound')) return 'riftbound';
  if (
    t.includes('magic') ||
    t.includes('mtg') ||
    t.includes('commander') ||
    t.includes('draft') ||
    t.includes('teenage mutant ninja turtles') ||
    t.includes('tmnt')
  )
    return 'mtg';
  if (t.includes('pok') || t.includes('pokemon')) return 'pokemon';
  if (t.includes('one piece')) return 'onepiece';
  if (t.includes('star wars') || t.includes('swu')) return 'swu';
  if (t.includes('lorcana')) return 'lorcana';
  if (t.includes('warhammer') || t.includes('40k')) return 'warhammer';
  if (t.includes('flesh') || t.includes('armory') || t.includes('fab')) return 'fab';
  if (t.includes('board game') || t.includes('open play')) return 'boardgames';
  return 'other';
}

export const categoryLabel: Record<EventCategory, string> = {
  mtg: 'MTG',
  riftbound: 'Riftbound',
  pokemon: 'Pokémon',
  onepiece: 'One Piece',
  swu: 'Star Wars Unlimited',
  lorcana: 'Lorcana',
  warhammer: 'Warhammer',
  fab: 'Flesh and Blood',
  boardgames: 'Board & Open Play',
  other: 'Other',
};
