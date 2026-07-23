import { expect, test } from '@playwright/test';

test('hiring a plan carries the quotation and personal data into the payment summary', async ({
  page,
}) => {
  await page.goto('/cotizacion');
  await page.getByRole('button', { name: 'Contratar' }).first().click();

  await expect(page).toHaveURL(/\/informacion-personal$/);

  await page.getByLabel('Nombre').fill('Juan');
  await page.getByLabel('Apellido').fill('Perez');
  await page.getByLabel('Calle').fill('Av. Siempre Viva');
  await page.getByLabel('Numero').fill('742');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page).toHaveURL(/\/pago$/);
  await expect(page.getByRole('heading', { name: 'Selecciona tu método de pago' })).toBeVisible();
  await expect(page.getByText('Resumen').first()).toBeVisible();
  await expect(page.getByText('$15.990').first()).toBeVisible();

  await page.getByText('Detalle del seguro').first().click();
  await expect(page.getByText('Hospitalizacion').first()).toBeVisible();

  await page.getByText('Datos del asegurado').first().click();
  await expect(page.getByText('Juan Perez').first()).toBeVisible();
});
