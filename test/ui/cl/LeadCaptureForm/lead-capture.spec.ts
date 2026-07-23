import { expect, test } from '@playwright/test';

test('renders the CL lead capture starter form', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Producto de seguros')).toBeVisible();
  await expect(page.getByLabel('RUT del asegurado')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Continuar' })).toBeVisible();
});

test('opens the more info modal', async ({ page }) => {
  await page.goto('/');

  await page.getByText('Más información').click();

  await expect(page.getByText('Conoce tu seguro')).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Coberturas' })).toBeVisible();
});

test('advances to quotation after valid submit', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('RUT del asegurado').fill('171654321');
  await page.getByLabel('Fecha de nacimiento').fill('01/01/1990');
  await page.getByLabel('Correo electronico').fill('lead@example.com');
  await page.getByLabel('Telefono').fill('987654321');
  await page
    .getByRole('checkbox', {
      name: /Acepto que me contacten para terminar el proceso de contratacion del seguro/,
    })
    .check();
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page).toHaveURL(/\/cotizacion$/);
});
