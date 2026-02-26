import { GraphQLClient, gql } from 'graphql-request';

type ShopifyProductNode = {
  id: string;
  title: string;
  handle: string;
  featuredImage?: { url: string; altText?: string | null } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
};

export type ShopifyProductCard = {
  id: string;
  title: string;
  handle: string;
  imageUrl?: string;
  imageAlt?: string;
  price: string;
  currencyCode: string;
};

function getClient() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN;

  if (!domain || !token) return null;

  return new GraphQLClient(`https://${domain}/api/2025-01/graphql.json`, {
    headers: {
      'X-Shopify-Storefront-Access-Token': token,
      'Content-Type': 'application/json',
    },
  });
}

const PRODUCTS_QUERY = gql`
  query FeaturedProducts($first: Int!) {
    products(first: $first, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        id
        title
        handle
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export async function getShopifyFeaturedProducts(first = 6): Promise<ShopifyProductCard[]> {
  const client = getClient();
  if (!client) return [];

  try {
    const data = await client.request<{ products: { nodes: ShopifyProductNode[] } }>(PRODUCTS_QUERY, { first });

    return data.products.nodes.map((p) => ({
      id: p.id,
      title: p.title,
      handle: p.handle,
      imageUrl: p.featuredImage?.url,
      imageAlt: p.featuredImage?.altText || undefined,
      price: Number(p.priceRange.minVariantPrice.amount).toFixed(2),
      currencyCode: p.priceRange.minVariantPrice.currencyCode,
    }));
  } catch {
    return [];
  }
}

export function getShopifyProductUrl(handle: string) {
  const publicDomain = process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN;
  return publicDomain ? `https://${publicDomain}/products/${handle}` : '#';
}
