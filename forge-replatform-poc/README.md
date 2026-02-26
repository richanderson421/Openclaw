# Forge Replatform POC

POC frontend for replacing Crystal Commerce storefront UX.

## Run locally

```bash
npm install
npm run dev
```

## Build checks

```bash
npm run lint
npm run build
```

## Shopify integration layer

The homepage now supports pulling featured products from Shopify Storefront API.

Create `.env.local` from `env-template.txt`:

```bash
cp env-template.txt .env.local
```

Required env vars:
- `SHOPIFY_STORE_DOMAIN` (e.g. `your-store.myshopify.com`)
- `SHOPIFY_STOREFRONT_TOKEN` (Storefront access token)

Optional:
- `NEXT_PUBLIC_SHOPIFY_PUBLIC_DOMAIN`

If env vars are not set, the POC falls back to local mock product data.
