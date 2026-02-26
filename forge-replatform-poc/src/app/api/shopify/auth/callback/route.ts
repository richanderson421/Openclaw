import { NextResponse } from 'next/server';
import { exchangeCodeForToken, verifyShopifyHmac } from '@/lib/shopify';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = url.searchParams;
  const shop = params.get('shop') || '';
  const code = params.get('code') || '';
  const state = params.get('state') || '';

  const apiSecret = process.env.SHOPIFY_API_SECRET;
  if (!apiSecret) return NextResponse.json({ error: 'Missing SHOPIFY_API_SECRET' }, { status: 500 });

  const cookieHeader = req.headers.get('cookie') || '';
  const cookieState = cookieHeader
    .split(';')
    .map((s) => s.trim())
    .find((s) => s.startsWith('shopify_oauth_state='))
    ?.split('=')[1];

  if (!shop || !code || !state || !cookieState || cookieState !== state) {
    return NextResponse.json({ error: 'Invalid OAuth state or missing parameters' }, { status: 400 });
  }

  if (!verifyShopifyHmac(params, apiSecret)) {
    return NextResponse.json({ error: 'Invalid HMAC' }, { status: 401 });
  }

  try {
    const token = await exchangeCodeForToken(shop, code);

    // Intentionally return token once so operator can store as env var.
    // Do NOT keep this endpoint publicly accessible long-term.
    return NextResponse.json({
      ok: true,
      shop,
      scope: token.scope,
      next: 'Save this as SHOPIFY_OFFLINE_ACCESS_TOKEN in Vercel env vars, then remove/restrict this callback output.',
      access_token: token.access_token,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'OAuth exchange failed' },
      { status: 500 },
    );
  }
}
