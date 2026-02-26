export type GameCategory = 'MTG' | 'One Piece' | 'Pokemon' | 'SWU' | 'Riftbound' | 'Lorcana';

export type EventItem = {
  id: string;
  title: string;
  day: string;
  time: string;
  category: GameCategory;
};

export type ProductItem = {
  id: string;
  title: string;
  price: string;
  badge: 'Preorder' | 'New In Stock';
  category: GameCategory;
};

export const weekEvents: EventItem[] = [
  { id: '1', title: 'Commander Night at The Forge', day: 'Thursday', time: '4:00 PM', category: 'MTG' },
  { id: '2', title: 'Star Wars Unlimited Weekly Free Play', day: 'Thursday', time: '5:00 PM', category: 'SWU' },
  { id: '3', title: 'Riftbound Nexus Night', day: 'Friday', time: '6:30 PM', category: 'Riftbound' },
  { id: '4', title: 'FNM Draft', day: 'Friday', time: '6:30 PM', category: 'MTG' },
  { id: '5', title: 'One Piece Weekly Meetup', day: 'Saturday', time: '1:00 PM', category: 'One Piece' },
  { id: '6', title: 'Pokemon Weekly Meetup', day: 'Tuesday', time: '5:30 PM', category: 'Pokemon' },
];

export const featuredProducts: ProductItem[] = [
  { id: 'p1', title: 'TMNT Collector Booster Box (12 Packs)', price: '$379.99', badge: 'Preorder', category: 'MTG' },
  { id: 'p2', title: 'Riftbound Nexus Bundle', price: '$61.99', badge: 'New In Stock', category: 'Riftbound' },
  { id: 'p3', title: 'One Piece Sealed Product Drop', price: '$119.99', badge: 'New In Stock', category: 'One Piece' },
  { id: 'p4', title: 'SWU Weekly Spotlight Product', price: '$39.99', badge: 'Preorder', category: 'SWU' },
  { id: 'p5', title: 'Pokemon Sealed Restock Bundle', price: '$84.99', badge: 'New In Stock', category: 'Pokemon' },
  { id: 'p6', title: 'Lorcana Weekly Featured Item', price: '$49.99', badge: 'Preorder', category: 'Lorcana' },
];

export const gameCategories: GameCategory[] = ['MTG', 'One Piece', 'Pokemon', 'SWU', 'Riftbound', 'Lorcana'];
