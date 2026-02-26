import { test, expect } from '@playwright/test';

test('home page loads and shows events shell', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Forge Events/);
  await expect(page.getByRole('heading', { name: "What's Happening This Week" })).toBeVisible();
});
