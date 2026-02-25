import { test, expect } from '@playwright/test';

test('home page loads and shows starter content', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Create Next App/);
  await expect(page.getByText('To get started, edit the page.tsx file.')).toBeVisible();
});
