import { featuredProducts, weekEvents } from '@/lib/mock-data';
import { getShopifyFeaturedProducts, getShopifyProductUrl } from '@/lib/shopify';
import { HomeExperienceClient } from '@/components/home-experience-client';

export async function HomeExperience() {
  const shopifyProducts = await getShopifyFeaturedProducts(4);

  const products = shopifyProducts.length
    ? shopifyProducts.map((p) => ({
        id: p.id,
        title: p.title,
        price: `$${p.price}`,
        badge: 'New In Stock' as const,
        category: 'MTG' as const,
        url: getShopifyProductUrl(p.handle),
      }))
    : featuredProducts.slice(0, 4).map((p) => ({ ...p, url: '/categories/mtg' }));

  return <HomeExperienceClient initialProducts={products} events={weekEvents} />;
}
