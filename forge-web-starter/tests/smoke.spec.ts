import { test, expect } from '@playwright/test';

test('home page loads and shows starter content', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Next\.js/);
  await expect(page.getByText('Get started by editing')).toBeVisible();
});
