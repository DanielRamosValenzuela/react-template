import { expect, test } from '@playwright/test';

test('hiring a plan from quotation lands on payment with the plan summary', async ({ page }) => {
  await page.goto('/cotizacion');

  await page.getByRole('button', { name: 'Contratar' }).first().click();

  await expect(page).toHaveURL(/\/pago$/);
  await expect(page.getByRole('heading', { name: 'Selecciona tu método de pago' })).toBeVisible();
  await expect(page.getByText('Resumen').first()).toBeVisible();
  await expect(page.getByText('$15.990').first()).toBeVisible();

  await page.getByText('Detalle del seguro').first().click();
  await expect(page.getByText('Hospitalizacion').first()).toBeVisible();
});
