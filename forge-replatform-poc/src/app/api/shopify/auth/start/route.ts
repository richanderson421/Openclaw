import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { buildOAuthRedirect, getShopDomain } from '@/lib/shopify';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const shop = (url.searchParams.get('shop') || getShopDomain()).trim();

  if (!shop) {
    return NextResponse.json({ error: 'Missing shop domain. Set SHOPIFY_STORE_DOMAIN or pass ?shop=' }, { status: 400 });
  }

  const state = crypto.randomBytes(12).toString('hex');
  const redirect = buildOAuthRedirect(shop, state);

  const res = NextResponse.redirect(redirect);
  res.cookies.set('shopify_oauth_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10,
  });
  return res;
}
