import { expect, test } from '@playwright/test';

test('renders the CL quotation mock with Tomaco product cards', async ({ page }) => {
  await page.goto('/cotizacion');

  await expect(page.getByRole('heading', { name: 'Selecciona tu plan' })).toBeVisible();
  await expect(page.getByText('Salud Base')).toBeVisible();
});