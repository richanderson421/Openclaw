# Forge Web Starter

Customer-facing Forge event app (Discord scheduled events) + agent-driven build/test loops.

## Commands

```bash
npm run dev            # local dev server
npm run check          # lint + production build
npm run test:e2e       # Playwright smoke test (headless)
npm run test:e2e:headed
```

## First-time browser test setup

Install Playwright browser binaries once:

```bash
npx playwright install chromium
```

## Staging deploy hook

`npm run deploy:staging` is intentionally a guarded placeholder. Once Vercel credentials are set, replace with your real deploy command.

## Environment variables

Set these in Vercel project settings:

- `DISCORD_BOT_TOKEN` (required)
- `DISCORD_GUILD_ID` (optional, defaults to `1278178261037486181`)

## Notes

- Playwright config auto-starts the app on `http://127.0.0.1:3000`.
- Smoke test validates homepage shell renders.
- Data refresh is cached for 5 minutes.
