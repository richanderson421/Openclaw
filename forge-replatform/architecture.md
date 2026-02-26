# Architecture (Target)

## Core components
1. **Web App (Next.js on Vercel)**
   - Customer storefront pages
   - Events pages
   - Product listing/product details
   - Content pages (FAQ, policies, onboarding)

2. **Commerce Backend (Shopify recommended)**
   - Products, variants, inventory
   - Cart/checkout
   - Orders, taxes, shipping

3. **Integration Layer**
   - Optional sync jobs for events + announcements
   - Webhooks for inventory/order updates

4. **Data Sources**
   - Discord events (already integrated)
   - Google Calendar (optional display/sync)
   - Shopify catalog/inventory

## Routing model
- `theforgecville.com` -> Next.js app
- `shop.theforgecville.com` (optional) -> storefront/checkout flow
- Preserve legacy URLs via redirects map

## Security model
- Secrets in Vercel env vars only
- Server-side API usage for third-party tokens
- Principle of least privilege for API keys
- Audit logs for deploy and admin actions

## Initial non-goals
- Custom OMS/WMS
- Fully custom checkout logic
- Loyalty platform migration on day 1
