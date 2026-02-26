# Forge Replatform Plan

Goal: Replace Crystal Commerce with a modern, fast, mobile-first commerce + community stack without interrupting day-to-day sales.

## Strategy
Phased migration:
1. Front-end + UX replacement first
2. Catalog/inventory sync
3. Checkout migration
4. Cutover + Crystal decommission

## Proposed target stack
- Frontend: Next.js (App Router)
- Hosting: Vercel
- Commerce backend (recommended): Shopify
- Search: Algolia/Meilisearch (phase 2)
- Auth/CRM: optional in phase 2+
- Analytics: Plausible or GA4

## Why this path
- Fastest time-to-value while keeping risk low
- Can ship customer improvements immediately
- Lets ops continue while migration runs in parallel

## Documents
- `architecture.md`
- `mvp-backlog.md`
- `migration-checklist.md`
- `risk-register.md`
- `timeline.md`
