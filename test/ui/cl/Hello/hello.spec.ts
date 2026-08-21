import { expect, test } from '@playwright/test';

test('resolves HOGAR_QUOTE_START for CL on the root route', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Cotizador de seguros de Hogar' })).toBeVisible();
  await expect(page.getByLabel('RUT del asegurado')).toBeVisible();
  await expect(page.getByRole('heading', { name: /^Hola/ })).toHaveCount(0);
  await expect(page.getByText('Formulario pendiente', { exact: true })).toHaveCount(0);
});
