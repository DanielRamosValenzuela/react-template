import { expect, test } from '@playwright/test';

test('renders the country greeting resolved by CountryFormResolver', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /^Hola (Chile|Colombia|Perú)$/ })).toBeVisible();
});
