import { expect, test, type Page } from '@playwright/test';

const GENERAL_FORM_ALERT = 'Completa la información solicitada para avanzar';
const CONSENT_COPY =
  'Acepto que me contacten para terminar el proceso de contratación del seguro según la política de privacidad.';
const CONSENT_COPY_LABEL =
  'Acepto que me contacten para terminar el proceso de contratación del seguro según la';
const ADVISOR_TOOLTIP_COPY =
  'Código de asesor: Si estás siendo atendido por un ejecutivo, ingresa el código que te proporcione.';
const UNDERAGE_ALERT = 'Para contratar este seguro debes ser mayor de 18 años de edad.';

const openChileQuote = async (page: Page) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Cotizador de seguros de Hogar' })).toBeVisible();
};

const formatInputDate = (date: Date) =>
  [date.getDate(), date.getMonth() + 1, date.getFullYear()]
    .map((part, index) => String(part).padStart(index < 2 ? 2 : 4, '0'))
    .join('/');

const fillValidChileForm = async (page: Page) => {
  await page.getByLabel('RUT del asegurado').fill('10.000.030-k');
  await page.getByLabel('Fecha de nacimiento').fill('03/02/1990');
  await page.getByLabel('Correo electrónico').fill('  PLAYWRIGHT.SYNTHETIC@EXAMPLE.COM  ');
  await page.getByLabel('Teléfono').fill('912345678');
  const consent = page.getByLabel(CONSENT_COPY);
  await consent.scrollIntoViewIfNeeded();
  await page.getByText(CONSENT_COPY_LABEL, { exact: true }).click();
  await expect(consent).toBeChecked();
};

test('renders the pristine Chile form with approved copy, accessible labels, and desktop geometry', async ({
  page,
}) => {
  await openChileQuote(page);

  await expect(page.getByRole('img', { name: 'Falabella Seguros' })).toHaveCount(1);
  await expect(page.getByText('Conoce cómo funciona este seguro', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Más información' })).toBeVisible();
  await expect(page.getByLabel('RUT del asegurado')).toHaveValue('');
  await expect(page.getByLabel('Fecha de nacimiento')).toHaveValue('');
  await expect(page.getByLabel('Correo electrónico')).toHaveValue('');
  await expect(page.getByLabel('Teléfono')).toHaveValue('');
  const consent = page.getByLabel(CONSENT_COPY);
  await expect(consent).not.toBeChecked();
  await expect(page.getByLabel('Estoy recibiendo ayuda de un asesor')).not.toBeChecked();
  await expect(page.getByRole('button', { name: 'Continuar' })).toBeEnabled();
  await expect(page.getByRole('link', { name: 'preguntas frecuentes' })).toHaveAttribute(
    'href',
    '#preguntas-frecuentes',
  );
  await expect(page.locator('[class*="promo"], [class*="promotion"]')).toHaveCount(0);

  await page.getByText(CONSENT_COPY_LABEL, { exact: true }).click();
  await expect(consent).toBeChecked();
  await consent.press('Space');
  await expect(consent).not.toBeChecked();

  await page.getByRole('link', { name: 'política de privacidad.' }).click();
  await expect(page).toHaveURL(/#politica-de-privacidad$/);
  await expect(consent).not.toBeChecked();
  await expect(page.getByText(GENERAL_FORM_ALERT, { exact: true })).toHaveCount(0);

  const card = page.locator('.hogar-quote-card');
  const body = page.locator('.hogar-quote-card__body');
  const firstField = page.getByLabel('RUT del asegurado');
  const [cardBox, bodyBox, firstFieldBox] = await Promise.all([
    card.boundingBox(),
    body.boundingBox(),
    firstField.boundingBox(),
  ]);

  expect(cardBox).not.toBeNull();
  expect(bodyBox).not.toBeNull();
  expect(firstFieldBox).not.toBeNull();
  expect(cardBox?.width).toBeCloseTo(560, 0);
  expect(cardBox?.x).toBeCloseTo((1280 - 560) / 2, 0);
  expect(bodyBox?.width).toBeCloseTo(560, 0);
  expect(firstFieldBox?.width).toBeCloseTo(480, 0);

  const faqLink = page.getByRole('link', { name: 'preguntas frecuentes' });
  await faqLink.click();
  await expect(page).toHaveURL(/#preguntas-frecuentes$/);
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('shows exact empty-submit errors, announces the warning, and focuses the first field', async ({
  page,
}) => {
  await openChileQuote(page);

  const continueButton = page.getByRole('button', { name: 'Continuar' });
  await continueButton.click();

  await expect(page.getByText('Debes ingresar un RUT válido', { exact: true })).toBeVisible();
  await expect(
    page.getByText('Ingresa una fecha de nacimiento válida', { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText('Debes ingresar un correo electrónico válido', { exact: true }),
  ).toBeVisible();
  await expect(page.getByText('Debes ingresar un teléfono válido', { exact: true })).toBeVisible();
  await expect(page.getByRole('status').filter({ hasText: GENERAL_FORM_ALERT })).toBeVisible();
  await expect(page.getByLabel('RUT del asegurado')).toBeFocused();
  await expect(continueButton).toBeEnabled();
});

test('reveals, explains, validates, and clears the optional advisor code', async ({ page }) => {
  await openChileQuote(page);

  const advisorSwitch = page.getByLabel('Estoy recibiendo ayuda de un asesor');
  await advisorSwitch.check();

  const advisorCode = page.getByLabel('Código del asesor');
  const tooltipTrigger = page.getByRole('button', { name: ADVISOR_TOOLTIP_COPY });
  await expect(advisorCode).toBeVisible();
  await expect(tooltipTrigger).toHaveAttribute('aria-expanded', 'false');

  await tooltipTrigger.focus();
  await tooltipTrigger.press('Enter');
  await expect(tooltipTrigger).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText(ADVISOR_TOOLTIP_COPY, { exact: true })).toBeVisible();
  await tooltipTrigger.press('Escape');
  await expect(tooltipTrigger).toHaveAttribute('aria-expanded', 'false');

  await advisorCode.fill('A-123');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByText('Debes ingresar un código válido', { exact: true })).toBeVisible();

  await advisorSwitch.uncheck();
  await expect(advisorCode).toHaveCount(0);
  await advisorSwitch.check();
  await expect(page.getByLabel('Código del asesor')).toHaveValue('');
});

test('announces the approved underage warning near the primary action', async ({ page }) => {
  await openChileQuote(page);
  await fillValidChileForm(page);

  const today = new Date();
  const underageBirthDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate());
  await page.getByLabel('Fecha de nacimiento').fill(formatInputDate(underageBirthDate));
  await page.getByRole('button', { name: 'Continuar' }).click();

  const underageStatus = page.getByRole('status').filter({ hasText: UNDERAGE_ALERT });
  await expect(underageStatus).toBeVisible();
  await expect(underageStatus).toHaveAttribute('aria-live', 'polite');
});

test('exposes loading during a valid local submit, greets Chile, and stores no browser PII', async ({
  page,
}) => {
  await openChileQuote(page);
  await fillValidChileForm(page);

  const postLoadRequests: string[] = [];
  page.on('request', (request) => postLoadRequests.push(request.url()));
  await page.evaluate(() => {
    const button = document.querySelector<HTMLButtonElement>('.hogar-quote-card__cta');
    if (!button) throw new Error('Quote CTA was not found');

    const probe = {
      observer: undefined as MutationObserver | undefined,
      sawDisabled: button.disabled,
    };
    probe.observer = new MutationObserver(() => {
      probe.sawDisabled ||= button.disabled;
    });
    probe.observer.observe(button, { attributes: true, attributeFilter: ['disabled'] });
    (
      globalThis as typeof globalThis & {
        __quoteLoadingProbe?: typeof probe;
      }
    ).__quoteLoadingProbe = probe;
  });

  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Hola Chile' })).toBeVisible();

  const sawDisabled = await page.evaluate(() => {
    const probe = (
      globalThis as typeof globalThis & {
        __quoteLoadingProbe?: { observer?: MutationObserver; sawDisabled: boolean };
      }
    ).__quoteLoadingProbe;
    probe?.observer?.disconnect();
    return probe?.sawDisabled ?? false;
  });
  expect(sawDisabled).toBe(true);
  expect(postLoadRequests).toEqual([]);

  const storage = await page.evaluate(() => ({
    local: Object.fromEntries(
      Array.from({ length: localStorage.length }, (_, index) => localStorage.key(index))
        .filter((key): key is string => Boolean(key))
        .map((key) => [key, localStorage.getItem(key)]),
    ),
    session: Object.fromEntries(
      Array.from({ length: sessionStorage.length }, (_, index) => sessionStorage.key(index))
        .filter((key): key is string => Boolean(key))
        .map((key) => [key, sessionStorage.getItem(key)]),
    ),
  }));
  const serializedStorage = JSON.stringify(storage);
  expect(serializedStorage).not.toContain('PLAYWRIGHT.SYNTHETIC');
  expect(serializedStorage).not.toContain('10000030');
  expect(serializedStorage).not.toContain('912345678');
  expect(page.url()).not.toContain('PLAYWRIGHT.SYNTHETIC');
  expect(page.url()).not.toContain('10000030');
});

test('supports accessible dialog tabs, keyboard flow, every close path, and focus return', async ({
  page,
}) => {
  await openChileQuote(page);

  const informationLink = page.getByRole('link', { name: 'Más información' });
  await informationLink.focus();
  await informationLink.click();

  const dialog = page.getByRole('dialog', { name: 'Seguro de Hogar' });
  const closeButton = page.getByRole('button', { name: 'Cerrar dialogo' });
  const coverageTab = page.getByRole('tab', { name: 'Coberturas y asistencias' });
  const glossaryTab = page.getByRole('tab', { name: 'Glosario' });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('tab')).toHaveCount(2);
  await expect(coverageTab).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel', { name: 'Coberturas y asistencias' })).toContainText(
    'Incendio.',
  );
  await expect(page.getByRole('tabpanel', { name: 'Coberturas y asistencias' })).toContainText(
    'Plomería.',
  );

  await coverageTab.focus();
  await coverageTab.press('ArrowRight');
  await expect(glossaryTab).toBeFocused();
  await expect(glossaryTab).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel', { name: 'Glosario' })).toContainText('Deducible:');
  await expect(page.getByRole('tabpanel', { name: 'Glosario' })).toContainText(
    'Ese monto lo paga el cliente en cada evento.',
  );

  await closeButton.focus();
  await closeButton.press('Shift+Tab');
  await expect(glossaryTab).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(informationLink).toBeFocused();

  await informationLink.click();
  await page.mouse.click(10, 10);
  await expect(dialog).toBeHidden();
  await expect(informationLink).toBeFocused();

  await informationLink.click();
  await closeButton.click();
  await expect(dialog).toBeHidden();
  await expect(informationLink).toBeFocused();
});

test.describe('mobile 375px', () => {
  test.use({ viewport: { height: 812, width: 375 } });

  test('keeps 24px gutters, one-column flow, no overflow, and a responsive dialog', async ({
    page,
  }) => {
    await openChileQuote(page);

    const layout = await page.evaluate(() => {
      const main = document.querySelector<HTMLElement>('.hogar-quote-page');
      const card = document.querySelector<HTMLElement>('.hogar-quote-card');
      const cta = document.querySelector<HTMLElement>('.hogar-quote-card__cta');
      if (!main || !card || !cta) throw new Error('Expected quote layout was not found');

      const mainBox = main.getBoundingClientRect();
      const cardBox = card.getBoundingClientRect();
      const formBox = cta.closest('form')?.getBoundingClientRect();
      const ctaBox = cta.getBoundingClientRect();
      return {
        card: { left: cardBox.left, right: cardBox.right, width: cardBox.width },
        ctaInsideForm: Boolean(
          formBox && ctaBox.top >= formBox.top && ctaBox.bottom <= formBox.bottom,
        ),
        ctaPosition: getComputedStyle(cta).position,
        main: {
          left: mainBox.left,
          paddingLeft: getComputedStyle(main).paddingLeft,
          paddingRight: getComputedStyle(main).paddingRight,
          right: mainBox.right,
          width: mainBox.width,
        },
        scrollWidth: document.documentElement.scrollWidth,
      };
    });

    expect(layout.scrollWidth).toBeLessThanOrEqual(375);
    expect(layout.main).toEqual({
      left: 0,
      paddingLeft: '24px',
      paddingRight: '24px',
      right: 375,
      width: 375,
    });
    expect(layout.card).toEqual({ left: 24, right: 351, width: 327 });
    expect(['fixed', 'sticky']).not.toContain(layout.ctaPosition);
    expect(layout.ctaInsideForm).toBe(true);

    await page.getByRole('link', { name: 'Más información' }).click();
    const dialogGeometry = await page
      .getByRole('dialog', { name: 'Seguro de Hogar' })
      .evaluate((dialog) => {
        const box = dialog.getBoundingClientRect();
        const content = dialog.querySelector<HTMLElement>('.hogar-information-dialog__content');
        return {
          contentScrolls: Boolean(content && content.scrollHeight > content.clientHeight),
          left: box.left,
          right: box.right,
          width: box.width,
        };
      });

    expect(dialogGeometry).toEqual({
      contentScrolls: true,
      left: 24,
      right: 351,
      width: 327,
    });
  });
});
