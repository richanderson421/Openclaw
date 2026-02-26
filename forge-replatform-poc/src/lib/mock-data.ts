export type EventItem = {
  id: string;
  title: string;
  day: string;
  time: string;
  category: 'MTG' | 'One Piece' | 'Pokemon' | 'SWU' | 'Riftbound' | 'Lorcana';
};

export const weekEvents: EventItem[] = [
  { id: '1', title: 'Commander Night at The Forge', day: 'Thursday', time: '4:00 PM', category: 'MTG' },
  { id: '2', title: 'Star Wars Unlimited Weekly Free Play', day: 'Thursday', time: '5:00 PM', category: 'SWU' },
  { id: '3', title: 'Riftbound Nexus Night', day: 'Friday', time: '6:30 PM', category: 'Riftbound' },
  { id: '4', title: 'FNM Draft', day: 'Friday', time: '6:30 PM', category: 'MTG' },
  { id: '5', title: 'One Piece Weekly Meetup', day: 'Saturday', time: '1:00 PM', category: 'One Piece' },
  { id: '6', title: 'Pokemon Weekly Meetup', day: 'Tuesday', time: '5:30 PM', category: 'Pokemon' },
];

export const heroBullets = [
  'Mobile-first event discovery',
  'Faster customer path to shop + events',
  'Community-first onboarding',
];
