import crypto from 'crypto';
import { GraphQLClient, gql } from 'graphql-request';

type ShopifyProductNode = {
  id: string;
  title: string;
  handle: string;
  featuredImage?: { url: string; altText?: string | null } | null;
  priceRangeV2: { minVariantPrice: { amount: string; currencyCode: string } };
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

export function getShopDomain() {
  return process.env.SHOPIFY_STORE_DOMAIN || '';
}

export function getShopifyProductUrl(handle: string) {
  const publicDomain = process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_DOMAIN || getShopDomain();
  return publicDomain ? `https://${publicDomain}/products/${handle}` : '#';
}

function getAdminClient() {
  const domain = getShopDomain();
  const token = process.env.SHOPIFY_OFFLINE_ACCESS_TOKEN;
  if (!domain || !token) return null;

  return new GraphQLClient(`https://${domain}/admin/api/2025-01/graphql.json`, {
    headers: {
      'X-Shopify-Access-Token': token,
      'Content-Type': 'application/json',
    },
  });
}

const ADMIN_PRODUCTS_QUERY = gql`
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
        priceRangeV2 {
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
  const client = getAdminClient();
  if (!client) return [];

  try {
    const data = await client.request<{ products: { nodes: ShopifyProductNode[] } }>(ADMIN_PRODUCTS_QUERY, { first });

    return data.products.nodes.map((p) => ({
      id: p.id,
      title: p.title,
      handle: p.handle,
      imageUrl: p.featuredImage?.url,
      imageAlt: p.featuredImage?.altText || undefined,
      price: Number(p.priceRangeV2.minVariantPrice.amount).toFixed(2),
      currencyCode: p.priceRangeV2.minVariantPrice.currencyCode,
    }));
  } catch {
    return [];
  }
}

export function verifyShopifyHmac(params: URLSearchParams, secret: string) {
  const hmac = params.get('hmac') || '';
  const sorted = [...params.entries()]
    .filter(([k]) => k !== 'hmac' && k !== 'signature')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  const digest = crypto.createHmac('sha256', secret).update(sorted).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(hmac));
}

export function buildOAuthRedirect(shop: string, state: string) {
  const apiKey = process.env.SHOPIFY_API_KEY;
  const appUrl = process.env.SHOPIFY_APP_URL;
  const scopes = process.env.SHOPIFY_SCOPES || 'read_products';

  if (!apiKey || !appUrl) throw new Error('Missing SHOPIFY_API_KEY or SHOPIFY_APP_URL');

  const redirectUri = `${appUrl}/api/shopify/auth/callback`;
  return `https://${shop}/admin/oauth/authorize?client_id=${encodeURIComponent(apiKey)}&scope=${encodeURIComponent(
    scopes,
  )}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}&grant_options[]=per-user`;
}

export async function exchangeCodeForToken(shop: string, code: string) {
  const apiKey = process.env.SHOPIFY_API_KEY;
  const apiSecret = process.env.SHOPIFY_API_SECRET;
  if (!apiKey || !apiSecret) throw new Error('Missing SHOPIFY_API_KEY or SHOPIFY_API_SECRET');

  const resp = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: apiKey, client_secret: apiSecret, code }),
  });

  if (!resp.ok) throw new Error(`OAuth token exchange failed (${resp.status})`);

  const json = (await resp.json()) as { access_token: string; scope: string };
  return json;
}
