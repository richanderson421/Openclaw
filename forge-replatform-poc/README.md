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

## Shopify integration (OAuth app model)

Create `.env.local` from template:

```bash
cp env-template.txt .env.local
```

Required app env vars:
- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_API_KEY`
- `SHOPIFY_API_SECRET`
- `SHOPIFY_APP_URL` (public base URL of this app)
- `SHOPIFY_SCOPES` (default `read_products`)

Then run OAuth start endpoint:

```text
/api/shopify/auth/start
```

Callback returns JSON including an `access_token`.
Save that value as:
- `SHOPIFY_OFFLINE_ACCESS_TOKEN`

Optional:
- `NEXT_PUBLIC_SHOPIFY_PUBLIC_DOMAIN`

If token/env vars are not set, homepage falls back to local mock product data.
