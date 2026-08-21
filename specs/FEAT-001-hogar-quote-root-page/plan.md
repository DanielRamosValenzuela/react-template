# Feature plan: FEAT-001: Hogar Quote Root Page

## Delivery boundary

- Feature ID: FEAT-001
- Desktop: `3165:14184`, `3165:16339`, `3165:16386`, `3165:16432`, viewport `1280px`.
- Mobile: `3165:14757`, viewport `360px`.
- Dialog: `3165:16815` y `3165:16842`.
- Figma approved version: `current-approved-2026-08-21`.
- Required design system: `tomaco-components@1.14.42`.
- Country: Chile únicamente.
- Contract mode: `no-backend-exception`.

## Technical summary

La root continúa como Server Component y obtiene `formName` mediante `getInitialFormByCountry`. CL registra `HOGAR_QUOTE`; CO/PE conservan `HELLO`. La root compone banner CL, `Header`, `PageCard` y el `CountryFormResolver` existente. `HogarQuoteForm` usa React Hook Form + Zod con `mode: "onTouched"`, valores locales, `InputDate` controlado y submit sin side effects. Advisor, `Dialog` y tabs usan estado React local. No se crean store, action, contrato, mock, analytics ni navegación.

## Repo patterns to reuse

Before naming a new file under `paths.widgetsRoot` or proposing a new shared
component, search existing features and that path for one that already
covers the need (see `docs/homero/architecture.md` and, if installed,
`graphify query` — `docs/homero/knowledge-graph.md`). List what you found
below; reuse or extend it, and only propose a new file if nothing matches.

- `src/app/(root)/page.tsx` ya compone el chrome visible; `src/app/layout.tsx` solo aporta CSS/providers. No duplicar Header ni logo.
- Reutilizar `src/widgets/Header`, con su destino `/` y progreso oculto, y `src/widgets/PageCard`, incluido `max-width-560`.
- Extender `src/config/CountryFormResolver.tsx`; no crear otro resolver.
- Activar `getInitialFormByCountry` y `FLOW_STEPS_BY_COUNTRY` desde `src/config/constants/flowConfig.ts`.
- Extender `InputController`; reutilizar `CheckBoxController` y añadir solo el adapter RHF necesario para `InputDate`.
- `FormSection`, `CardSectionTitle`, `DetailRow`, los directorios vacíos `QuoteGreeting`/`HogarCoverageForm` y `CommonStore` no cubren esta pantalla.
- No crear widgets compartidos: banner y Dialog son composición específica del formulario CL.
- Graphify confirmó `page.tsx -> Header/PageCard/CountryFormResolver`, el import dinámico por país y que no se necesita `CommonStore`.

## Tomaco components and tokens

For every screen or section this feature touches: the exact Tomaco
component name (confirmed against the installed `tomaco-components`
package, the generated catalog, or a Figma Code Connect mapping — never a
guess, per principle 11/16 in `docs/homero/constitution.md`), the props it
needs, and which design tokens (spacing, color, typography) back it. A
component you could not confirm does not go here — it goes under Open
questions in the spec.

- `Header`: reutilizar wrapper existente con `logoAlt="Falabella Seguros"`, `logoLink="/"`, step/progreso ocultos y `noMargin={false}`.
- `Input` mediante `InputController`: IDs/names explícitos, `control`, `labelText`, `placeholder`, `type`, `isValid` y `errorText`; email usa `type="email"`; teléfono usa `type="tel"`, `inputMode="numeric"` y `prefix="+56"`.
- `InputDate`: adapter RHF con `id/name="birthDate"`, `defaultDate={field.value}` controlado, `onChange`, `onBlur`, `showIcon`, `minDate=1900-01-01`, `maxDate=hoy`, `isValid` y `errorText`. Los umbrales de elegibilidad 100/19 años permanecen separados en Zod. No usar `InputDateLite`.
- `CheckBox`: `id/name="contactConsent"`, `checked`, `onChange` y children con anchor legal; no recibe error visible.
- `Switch`: `id/name="receivesAdvisorHelp"`, `checked` y `onChange`; uso directo sin adapter.
- CTA `Button`: `text="Continuar"`, `variant="primary"`, `type="submit"`, ancho líquido, sin loading/disabled. `Button` de “Más información” usa `appearance="link"`, `text`, `type="button"` y `onClick`; URLs reales usan anchors nativos.
- `Alert`: `type="warning"`, no cerrable y children literales para mensaje agregado y alertas etarias.
- `Dialog`: `isOpen`, `title="Seguro de Hogar"`, `closeButton`, `closeOutside`, `closeHandler` y clase scoped; complementar Escape, body lock, scroll reset y restauración de foco localmente.
- `Tab`: `activeTab`, `actionAnchor`, `equalWidth` y tabs con IDs `coverages`/`glossary`.
- No usar `Card` ni `Accordion`.
- Tokens confirmados: `--primary` (`#3B9326`), `--accent` (`#347B23`), `--neutral20` (`#C3CDD8`), `--neutral40` (`#90979E`), `--neutral60` (`#5E6267`), `--neutral80` (`#333537`), `--blueberry5` (`#F3F5FC`), `--blueberry10` (`#D4DCF4`), `--orange5` (`#FFF4DF`), `--orange40` (`#C28B12`), `--orange60` (`#8C6516`) y `--avocado-primary` (`#41A929`).
- Overrides scoped aprobados para canvas `#F4F7F9`, banner `#3AAE2A`, divisor `#E2E9EE`, texto `#323537`, sombras Figma y anchos sin utilidad Tomaco.
- Todo archivo que importe valores de `tomaco-components` declara `'use client'`.

## Pixel-perfect styling

For every screen and breakpoint (desktop, mobile — see `design.viewports`
in `feature.json`): exact paddings, margins, gaps, and layout (grid/flex
structure), expressed as Tomaco spacing tokens or utility classes, not raw
pixel values copied from Figma. Anything Figma shows that Tomaco has no
token for is an open question, not an invented value.

Desktop `1280px`:

- Banner `1280 × 56`, fondo `#3AAE2A`, inner `1152px`, icono `32px` y promoción `223 × 44`.
- Header `88px`, padding vertical `24px`, padding inline `64px` a 1280, borde `#E2E9EE` y margen inferior `56px`.
- Main `max-width:560px`, inicio `y=200`; título `560 × 75`, eyebrow `20/30`, icono `40px`, `gap:12px`, “Hogar” `32/44.8`; gap título/card `48px`.
- Card `560 × 841`, radio `8px`, blanco y sombra `0 1px 1px #0000000D`.
- Header card `560 × 59`, padding `16px 24px`, `--blueberry5`, borde `--blueberry10`, radio superior `8px`.
- Body `560 × 782`, padding `40px`, inner `480px`, gap estructural `40px`.
- Inputs `480 × 56`, grupos `87px`, stack `gap:24px`; no duplicar el padding interno `16px 12px` de Tomaco Input.
- Consentimiento `480 × 48`, checkbox `24px`, `gap:16px`; advisor `480 × 58`, padding `16px 24px`, switch `48 × 26`; CTA `480 × 56`; FAQ `464 × 48`, margin-top `40px`.

Mobile `360px`:

- Banner `360 × 56`, padding inline `8px`, `gap:10px`, overflow oculto; bloque izquierdo `184 × 32`; promoción `160 × 50`, bitmap visible `160 × 34`.
- Header `360 × 88`, padding `24px 16px`, margen inferior `40px`; logo `216 × 40`.
- Main `312px`, gutters `24px`, inicio `y=184`; título `312 × 75`; gap título/card `40px`.
- Card `312 × 940`; header `312 × 80`, padding `12px 16px`, columna y `gap:8px`; copy “Conoce cómo funciona este seguros”.
- Body `312 × 860`, padding `40px 24px`, inner `264px`.
- RUT/fecha/correo `264 × 56`; teléfono `264 × 64` mediante override scoped; stack total `428px`, `gap:24px`.
- Consentimiento `264 × 96`; advisor `264 × 80`; CTA `264 × 56`; FAQ `312 × 48`, margin-top `40px`.

Dialog:

- Desktop `max-width:640px`, contenido útil `592px`, radio `12px`, sombra `0 6px 12px #0000000D, 0 1px 1px #0000000D`; sin scroll horizontal.
- Header `56px`, close `40 × 40`, tabs `592 × 43`, contenido con margin-top `32px`; body con scroll vertical y padding lateral `24px`, inferior `32px`.
- Mobile width `100%`, `max-height:95vh`, contenido útil `312px`, radio superior `12px` y scroll interno.
- Tipografía propia: título `22/33`, heading `18/27`, body `16/24`, letter-spacing `0`.
- Alertas etarias se ubican antes del CTA; el mensaje agregado, después.

## Files to create or modify

Crear:

- `src/ui/cl/HogarQuoteForm/schema.ts`
- `src/ui/cl/HogarQuoteForm/useHogarQuoteForm.ts`
- `src/ui/cl/HogarQuoteForm/index.tsx`
- `src/ui/cl/HogarQuoteForm/content.ts`
- `src/ui/cl/HogarQuoteForm/HogarQuoteBanner.tsx`
- `src/ui/cl/HogarQuoteForm/HogarInsuranceInfoDialog.tsx`
- `src/widgets/form-controls/InputDateController/index.tsx`
- `test/ui/cl/HogarQuoteForm/schema.spec.ts`
- `test/ui/cl/HogarQuoteForm/hogar-quote-form.spec.ts`
- `test/app/(root)/page.spec.ts`
- Assets exportados desde los nodos aprobados bajo `public/cl/hogar/`: iconos banner/título/beneficios y promociones desktop/mobile.

Modificar:

- `src/app/(root)/page.tsx`
- `src/config/forms.ts`
- `src/config/CountryFormResolver.tsx`
- `src/config/constants/flowConfig.ts`
- `src/widgets/form-controls/InputController/index.tsx`
- `src/widgets/form-controls/CheckBoxController/index.tsx` solo para exponer foco
- `src/widgets/form-controls/index.ts`
- `src/app/globals.css`
- `playwright.config.ts` para descubrir `test/` y usar proyectos `1280px`/`360px`
- `homero.config.json` para comandos Playwright npm/npx

Eliminar al reemplazar el starter CL:

- `src/ui/cl/Hello/index.tsx`
- `test/ui/cl/Hello/hello.spec.ts`

No modificar ni crear `src/store/**`, `src/actions/**`, `src/contracts/**`, `src/mocks/**`, `src/widgets/Header/**`, `src/widgets/PageCard/**` ni contenido FAQ interno.

## Data and state flow

1. `commonConfig.country` llega a `/`.
2. `getInitialFormByCountry` devuelve `HOGAR_QUOTE` para CL y `HELLO` para CO/PE.
3. La root muestra banner CL, `Header`, `PageCard` y `CountryFormResolver`.
4. El resolver carga `HogarQuoteForm` de forma lazy.
5. RHF mantiene RUT, fecha, correo, teléfono y consentimiento; Zod valida.
6. Advisor usa un boolean React independiente; Dialog y tab usan estado local.
7. Submit inválido enfoca/scroll al primer error; submit válido ejecuta un no-op.
8. No existe persistencia, navegación, request, action, analytics ni estado de éxito.

## Backend contract and mocks plan

- Contract source: none.
- Contract confidence: not applicable; excepción humana explícita.
- Mock strategy/location: none.
- Payload assumptions: none.
- No registrar fixtures ni reutilizar directorios placeholder.
- Una integración futura requiere otra feature con contrato y mocks anonimizados.
- `productionMockFallbackAllowed` permanece `false`.

## Form and validation plan

- `schema.ts` exporta schema y `HogarQuoteFormValues = z.infer<typeof schema>`.
- `useForm({ mode: "onTouched", shouldFocusError: false })`; defaults: strings vacíos, fecha `null`, consentimiento `false`.
- Orden de schema/foco: RUT, fecha, correo, teléfono, consentimiento.
- RUT: normalizar, formatear y calcular DV módulo 11 localmente; no reutilizar `isValidDocumentByCountry`, que solo valida forma.
- Fecha: `InputDate` recibe límites técnicos de entrada `1900-01-01`–hoy para no coercionar los ejemplos Figma; schema y hook calculan por separado los umbrales dinámicos de elegibilidad 100/19 años al inicio del día. Fecha imposible/futura usa error de campo; fechas reales fuera de elegibilidad usan su alerta etaria y mantienen invalidez.
- Correo: Zod email. Teléfono: limpiar no dígitos, limitar a nueve y validar `^9\d{8}$`.
- Consentimiento produce error de schema sin pasarlo visualmente a `CheckBox`.
- El mensaje agregado depende de submit inválido y desaparece al quedar válido.
- `onInvalid` usa `setFocus` y `scrollIntoView({ block: "center" })`; `onValid` no modifica estado ni muestra feedback.
- Advisor no forma parte del schema y no crea código de asesor.

## Figma adaptation plan

- Redescargar assets por nodo durante implementación; no conservar URLs MCP temporales ni dibujar SVGs sustitutos.
- Usar Tomaco Web confirmado por paquete; los mappings disponibles son Compose o rutas web inexistentes.
- Assets editoriales redundantes con texto adyacente usan `alt=""`.
- Aplicar utilidades Tomaco para layout, spacing, color y tipografía; CSS scoped solo para medidas/colores sin token y diferencias aprobadas.
- Conservar todo el copy literal, incluido “facil”, “llamándonos” y “este seguros”.
- Comparar desktop con `14184`, `16339`, `16386`, `16432`, `16815`, `16842`; mobile inicial con `14757`.
- Estados mobile sin nodo propio se verifican por responsive behavior, accesibilidad y ausencia de overflow, sin fabricar baseline.
- No actualizar baselines automáticamente.

## Risks

- Tomaco CSS y el paquete npm tienen ciclos independientes; validar la hoja desplegada durante evidencia.
- `Dialog` 1.14.42 tiene `aria-labelledby` inconsistente; verificar un nombre accesible y aplicar un workaround scoped si hace falta.
- El banner mobile usa casi todo el ancho disponible; controlar overflow a `360px`.
- El límite de 100 años puede parecer comercial; copy y documentación deben identificarlo como restricción técnica.
- `InputDate@1.14.42` coerciona fechas fuera de `minDate`/`maxDate`; mantener el rango de entrada amplio y los umbrales de elegibilidad separados para que las alertas aprobadas sean alcanzables.
- Fechas relativas a hoy pueden volver frágiles los tests; calcular fronteras dinámicamente o fijar el reloj.
- El umbral `0.01` es estricto; cualquier diferencia remanente requiere revisión humana.
- Los destinos `example.com` son temporales deliberados y se reemplazarán en otra feature.

## Verification plan

- Prerequisite: `playwright.config.ts` usa `testDir="./test"` y proyectos desktop `1280px`/mobile `360px`; `homero.config.json` usa `npx playwright-cli` y `npx playwright test`.
- lint: `npm run lint`.
- typecheck: `npx tsc --noEmit`.
- tests focalizados: schemas, formulario CL y root bajo sus rutas espejo en `test/`.
- e2e: `npm run test:e2e`.
- gate previo a implementación: `node scripts/homero/homero.mjs feature check --target . --id FEAT-001`.
- receipt posterior a implementación/evidencia: `node scripts/homero/homero.mjs verify --target . --id FEAT-001`.
- Playwright Test cubre módulo 11, fronteras de fecha, email, teléfono, consentimiento, orden de foco, no-op válido, ausencia de requests/storage, advisor, enlaces, Dialog, tabs, cierre/reset y responsive.
- Playwright CLI usa sesión `homero-FEAT-001` y guarda screenshot/snapshot para: `initial-cl-desktop`, `invalid-submit-cl-desktop`, `age-over-technical-limit-cl-desktop`, `age-under-19-cl-desktop`, `valid-noop-and-advisor-cl-desktop`, `info-coverages-cl-desktop`, `info-glossary-cl-desktop`, `info-reset-close-cl-desktop`, `external-links-cl-desktop`, `initial-cl-mobile`, `invalid-submit-cl-mobile`, `age-over-technical-limit-cl-mobile`, `age-under-19-cl-mobile`, `info-coverages-cl-mobile` e `info-glossary-and-reset-cl-mobile`.
- Evidencia por stem: `features/FEAT-001/evidence/screenshots/<stem>.png` y `features/FEAT-001/evidence/snapshots/<stem>.yaml`, registrada en `features/FEAT-001/evidence/playwright-cli.json`.
