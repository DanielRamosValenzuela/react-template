# Feature plan: FEAT-001: Home Insurance Root Quote Form

## Delivery boundary

- Feature ID: FEAT-001
- Figma source: https://www.figma.com/design/ygl9QrEtz0s3nvLUyCzr1W/-HOGAR--Web-2.0?node-id=3165-14184&m=dev
- Figma approved version: live-observed-2026-08-20
- Required design system: Tomaco

## Technical summary

- Keep `/` as the orchestration surface and reuse its existing `Header -> PageCard -> CountryFormResolver` composition. Replace the active `HELLO` starter registration with `HOGAR_QUOTE_START`.
- Resolve Chile to a new RHF/Zod form under `src/ui/cl/HogarQuoteStartForm`; resolve Colombia and Peru to one global country-data-driven local quote view.
- Normalize the valid Chile form through a typed local form contract, store PII in a dedicated non-persisted Zustand store, then invoke a deterministic asynchronous `quoteLocally({ country })` mock that never receives PII.
- Build the Figma information surface as a local form composition using confirmed Tomaco `Dialog` and controlled `Tab`; use Tomaco form atoms through the existing RHF controller pattern.
- No Server Action, API client, Query, Web Storage persistence, analytics, promotion banner, or production mock fallback is introduced.

## Repo patterns to reuse

Before naming a new file under `paths.widgetsRoot` or proposing a new shared
component, search existing features and that path for one that already
covers the need (see `docs/homero/architecture.md` and, if installed,
`graphify query` — `docs/homero/knowledge-graph.md`). List what you found
below; reuse or extend it, and only propose a new file if nothing matches.

- Graphify query over `src` (`114` nodes, `185` edges) confirms the root/resolver/widgets/store/contracts path and the existing country split.
- Reuse `src/app/(root)/page.tsx` for orchestration and `src/config/environment.ts` for `COUNTRY -> NEXT_PUBLIC_COUNTRY -> cl` resolution.
- Reuse and extend `src/config/CountryFormResolver.tsx` and `src/config/forms.ts`; remove the active `Hello` mapping rather than creating a parallel resolver.
- Reuse `src/widgets/Header` and `src/widgets/PageCard`; page chrome stays outside the country form and must render once.
- Reuse `src/widgets/form-controls/InputController` and `CheckBoxController`, extending them to map `fieldState.error` to Tomaco `isValid/errorText`. Complete the existing empty `InputDateController` directory for controlled `InputDate` wiring. Add a `SwitchController` only because RHF wiring is real reusable logic.
- Reuse `src/contracts/forms/types.ts` and add the local form contract alongside it. Update its exception source union to represent `no-backend-exception` consistently.
- Use `src/store/CommonStore` only as a Zustand structural reference. Do not reuse its `persist`, `devtools`, or `sessionStorage` middleware for quote PII.
- Reuse `src/utils/functions/formatters.ts` where its phone digit formatting fits; replace/extend the current shape-only CL document validation with modulus-11 logic covered by tests.
- Do not reuse `FormSection`, `CardSectionTitle`, or `DetailRow`: they model titled summary sections, not this Figma form.

## Tomaco components and tokens

For every screen or section this feature touches: the exact Tomaco
component name (confirmed against the installed `tomaco-components`
package, the generated catalog, or a Figma Code Connect mapping — never a
guess, per principle 11/16 in `docs/homero/constitution.md`), the props it
needs, and which design tokens (spacing, color, typography) back it. A
component you could not confirm does not go here — it goes under Open
questions in the spec.

- Source of truth: installed `tomaco-components@1.14.42` declaration files plus the audited component gotchas and deployed Tomaco CSS utility reference.
- Root chrome: existing local `Header` delegates to Tomaco `Header`; existing `PageCard` owns `max-width-560`. No second header is introduced.
- Text fields: `Input` through `InputController`, with confirmed `labelText`, native `placeholder/type/inputMode/autoComplete/maxLength`, `prefix`, `isValid`, and `errorText`. Always pass `labelText/errorText`; their defaults are visible placeholders. `prefix="+56"` intentionally disables Tomaco's icon branch, matching the fixed-prefix decision.
- Date: `InputDate` through `InputDateController`, with `defaultDate` used as the controlled selected value, `onChange`, `onBlur`, `labelText`, `placeholder`, `id/name`, `isValid/errorText`, `showIcon`, and explicit `minDate/maxDate`. Use a sufficiently old minimum date and today as maximum; neither prop may be omitted because both default to today.
- Consent: `CheckBox` through `CheckBoxController`, passing unique `id/name`, controlled `checked`, `children`, `isValid/errorText`, and `onChange`. The visible label is `children`; never allow its default placeholder.
- Advisor: confirmed `Switch` with unique `id/name`, controlled `checked`, and `onChange`; use an RHF controller because the component is controlled. Advisor input reuses `Input`.
- Advisor help: confirmed `Tooltip` with `children`, `openTooltipIcon="interrogation"`, and `position`. Tomaco cannot render Figma's exact green info trigger because its trigger icon is hardcoded to interrogation/exclamation; preserve semantics and copy rather than hand-building a duplicate tooltip.
- Primary action/link actions: `Button` with `text`, `type="submit"`, `variant="primary"`, `loading`, and `disabled`; no `children`. Link-styled actions use `appearance="link"`, `type="button"`, and explicit click handlers so default submit behavior cannot fire.
- Form feedback: `Alert type="warning"` with explicit `children` and `clossable={false}` for the incomplete/underage messages. It is the closest confirmed Tomaco feedback primitive; Figma InlineMessage has no Tomaco export.
- Information surface: `Dialog` with controlled `isOpen`, `title`, `closeButton`, `closeOutside`, `closeHandler`, `size="medium-stretched-height"`, and children; `Tab` with `tabs`, controlled `activeTab`, `actionAnchor`, and `equalWidth`. Add an explicit accessible title association workaround because Tomaco's internal `aria-labelledby` does not match its title id.
- Layout/tokens: use `d-flex`, `flex-column`, `align-items-center`, `w-100`, `mx-auto`, `gap-12/gap-16/gap-24/gap-40`, directional Tomaco spacing (`pt24`, `pb40`, etc.), `br-8`, `br-12`, `shadow`, `shadow-modal`, `bg-white`, `bg-neutral5`, `text-neutral-primary`, `text-secondary`, `text-primary`, `border`, and `border-color-neutral10` where they match. Never use `px-*` for horizontal padding because Tomaco redefines it as font size.
- Figma-specific colors that have no verified semantic token match (`#F3F5FC`, `#D4DCF4`, warning `#FFF4DF`) remain narrowly scoped custom properties in `globals.css`; existing `--color-*` project variables are reused for page background, accent, border, and text.

## Pixel-perfect styling

For every screen and breakpoint (desktop, mobile — see `design.viewports`
in `feature.json`): exact paddings, margins, gaps, and layout (grid/flex
structure), expressed as Tomaco spacing tokens or utility classes, not raw
pixel values copied from Figma. Anything Figma shows that Tomaco has no
token for is an open question, not an invented value.

- Desktop baseline `1280px`: omit the Figma `56px` promotion, retain the existing shared `88px` header, then center the quote title and card in the page background `var(--color-bg-primary)`.
- Quote title: max width `560px`, centered, Home icon `40x40`, `12px` icon/text gap; desktop typography follows Figma `32/44.8` for `Hogar` and `20/30` supporting title, mapped to Tomaco `title-xl`/body utilities where exact.
- Form card: `560px` maximum width, `8px` radius, flat shadow. Information header is `560x59`, `24px` horizontal and `16px` vertical padding, background `#F3F5FC`, border `#D4DCF4`, and top radius `8px`.
- Card body: `40px` padding, `480px` content width, white background, bottom radius `8px`; major groups use `40px` gap.
- Fields: each block is `480x87` in the default state; control height is the Tomaco `56px` input height; label/control gap `12px`; consecutive fields use `24px` gap.
- Consent row: width `480px`, checkbox `24px`, label gap `16px`. Advisor row: width `480px`, minimum height `58px`, `24px` horizontal and `16px` vertical padding, radius `8px`; advisor code adds the Figma `127px` vertical expansion.
- CTA: `480x56`, full available width, Tomaco primary avocado/green treatment; keep it in flow and enabled except while submitting.
- Validation: inline field errors expand their own block; incomplete-form `Alert` sits below the CTA; underage `Alert` sits immediately above the CTA. Use `24px` between validation blocks and preserve the Figma warning background `#FFF4DF` via one scoped custom property.
- FAQ: max width `464px`, centered `40px` below the card, with `68px` minimum page-end space at the desktop baseline.
- Advisor tooltip: preserve the Figma `220x116` content box where Tomaco sizing allows; do not replace Tomaco's accessible trigger solely to match the green icon.
- Dialog desktop: `640x640` target, radius `12px`, modal shadow, `24px` horizontal content padding and `32px` bottom padding; two equal-width tabs; content scrolls internally. The long coverage node is `640x1872` source content clipped by the dialog viewport; glossary node is `640x786`.
- Mobile approved adaptation, baseline `375px`: `24px` page gutters produce `327px` available width; one column; card and fields use `width:100%`; card body changes to `40px 24px`; title/icon stack or wrap without overflow; CTA remains in flow. The promotion remains omitted.
- Mobile dialog: viewport width minus `48px`, maximum available height with internal scrolling, `24px` content padding, two equal tabs. Tomaco defaults to a full-width bottom sheet below `576px`, so add one feature-scoped global class/media rule to preserve the approved `24px` gutters and radius; do not alter every Dialog globally.
- Breakpoints: mobile rule through `767px`, matching the existing `only-card-page/starter-card-layout`; desktop measurements apply at `768px+`. Verify `1280x1320` reference composition after subtracting the intentionally omitted promotion.

## Files to create or modify

- Modify `src/app/(root)/page.tsx`: select the new form name and compose title/card without duplicating shared chrome.
- Modify `src/config/forms.ts`, `src/config/CountryFormResolver.tsx`, and `src/config/constants/flowConfig.ts`: replace `HELLO` with `HOGAR_QUOTE_START` and map CL/global country views.
- Create `src/ui/cl/HogarQuoteStartForm/schema.ts`, `useHogarQuoteStartForm.ts`, `index.tsx`, and local dialog/content composition files only when they carry real behavior.
- Create `src/ui/global/HogarLocalQuote/index.tsx` plus country greeting data for CO/PE; keep structure shared because only copy/data varies.
- Create `src/contracts/forms/hogarQuoteStart.ts`; modify `src/contracts/forms/types.ts` and barrel exports for the no-backend exception contract.
- Create `src/store/HogarQuoteStartStore/index.ts`; update `src/store/index.ts`. The store uses plain `create`, no middleware.
- Create `src/mocks/global/hogar/quoteLocally.ts` and deterministic greeting fixtures; keep it local/test-only and free of PII.
- Modify `src/widgets/form-controls/InputController/index.tsx` and `CheckBoxController/index.tsx`; create `InputDateController/index.tsx` and `SwitchController/index.tsx`; update `src/widgets/form-controls/index.ts`.
- Modify `src/utils/functions/formatters.ts` and `validations.ts` only for reusable RUT/phone normalization and modulus-11 validation.
- Modify `src/app/globals.css` only for the Figma-specific card/info/warning colors, dialog title association hook, arbitrary `560px` width already present, and feature-scoped mobile Dialog gutters.
- Add approved Home SVG assets under `public/global/hogar/`; do not add promotional bitmaps.
- Remove `src/ui/{cl,co,pe}/Hello` after resolver migration and replace its mirrored starter test.
- Modify `playwright.config.ts` to use `testDir: './test'` if pure contract/store tests are executed with Playwright; otherwise keep all executable tests below `test/ui`.
- Create mirrored tests under `test/ui/cl/HogarQuoteStartForm`, `test/ui/global/HogarLocalQuote`, `test/contracts/forms`, `test/store/HogarQuoteStartStore`, and `test/utils/functions` as supported by the finalized Playwright test discovery.

## Data and state flow

- `commonConfig.country` enters `/` and `CountryFormResolver` exactly as today.
- CL: field input -> RHF controller -> Zod schema (`mode: onTouched`) -> normalized `ClHogarQuoteStartPayload` builder -> in-memory `HogarQuoteStartStore.setValues` -> `quoteLocally({ country: 'cl' })` -> local result stored/rendered as `Hola Chile`.
- CO/PE: shared local quote view -> `quoteLocally({ country })` -> render country greeting. No Chile form values are constructed.
- `quoteLocally` returns a Promise so the existing Tomaco Button can expose pending/loading behavior, but it performs no network request and receives no PII.
- `hasAdvisor=false` triggers `resetField('advisorCode', { defaultValue: '' })`; the payload builder omits `advisorCode`.
- Dialog open state and active tab remain local component state; they do not enter Zustand.
- Refresh unmounts and clears the PII store. No storage hydration or restoration path exists.

## Backend contract and mocks plan

- Contract source: explicit `no-backend-exception` in `features/FEAT-001/feature.json` and the local TypeScript/Zod contract.
- Contract confidence: final for this prototype only; it is not a production API contract.
- Mock strategy: deterministic local function/fixtures.
- Mock location: `src/mocks/global/hogar/quoteLocally.ts` with synthetic test fixtures below mirrored tests.
- Payload assumptions to confirm with backend: none in scope; a later backend feature must define its own contract and must not treat this prototype payload as authoritative.
- `LocalQuoteRequest` contains only `country`; `LocalQuoteResult` contains only `country` and the typed country greeting. Empty, network, business, and server mock states are intentionally absent.

## Form and validation plan

- Export `HogarQuoteStartFormValues` using `z.infer<typeof schema>` and initialize RHF with explicit empty defaults and `mode: 'onTouched'`.
- RUT transform accepts optional punctuation and `K/k`, formats progressively, validates modulus 11, and builds `12345678-K`. Error: `Debes ingresar un RUT válido`.
- Birth date stays `Date | null` in RHF, supports manual/calendar input through controlled `InputDate`, validates a real local date and age `>=18`, and builds local `YYYY-MM-DD` without `toISOString`. Field error: `Ingresa una fecha de nacimiento válida`; underage form warning uses the approved copy.
- Email transform trims/lowercases at normalization time, validates standard email shape and maximum `254`. Error: `Debes ingresar un correo electrónico válido`.
- Phone input displays fixed `+56`, strips pasted prefix/separators, validates `^9\d{8}$`, and builds `+56${nationalNumber}`. Error: `Debes ingresar un teléfono válido`.
- Consent uses `z.literal(true)`. Its failed submit contributes to the form-level `Completa la información solicitada para avanzar` Alert rather than adding unapproved inline legal copy.
- Advisor code is conditional: when enabled, trimmed `^[A-Za-z0-9]{1,8}$`; otherwise reset/unregistered and omitted. Error: `Debes ingresar un código válido`.
- Submit uses RHF's invalid callback to set/show the general warning and focus the first invalid field. Preserve entered values on validation failure.
- Tests freeze/inject the current date for exact 18th birthday, cover leap dates and DV `K`, and assert no `localStorage/sessionStorage` writes.

## Figma adaptation plan

- Treat the human-provided live node set observed `2026-08-20` as the approved source. Capture all node IDs in implementation notes/evidence; never claim an unavailable Figma version ID.
- Reproduce base `3165:14184`, advisor `17280/17329/17389`, validation `16339`, underage `16432`, dialog `16671`, and tab content `16815/16842`.
- Use exactly two modal tabs and singular information-strip copy, resolving the contradictions in note `16745` and alternate plural strip `16750` per human direction.
- Exclude hidden Vida layers, the maximum-age state `16386`, all promotional assets/copy, and any third tab.
- Export and persist only approved Home/logo-support assets needed by the form/title/dialog; use Tomaco's own calendar and control icons where provided.
- Translate Palta/Figma instances into confirmed Tomaco atoms and project layout utilities. Use narrow global custom classes only where no Tomaco token/utility expresses the exact width/color/mobile Dialog gutter.
- Compare desktop screenshots at `1280px`; account explicitly for the omitted `56px` promotion when evaluating vertical offsets. Validate mobile at `375px` as approved responsive adaptation, not pixel parity with a missing frame.

## Risks

- Tomaco `Dialog` has a broken internal `aria-labelledby`; implementation must add/verify an accessible name and focus behavior rather than assuming the component solves it.
- Tomaco mobile `Dialog` defaults to a full-width bottom sheet; a feature-scoped CSS rule is required for the approved `24px` gutters.
- Tomaco `Tooltip` cannot reproduce the exact green info trigger. Prefer the confirmed component's accessible semantics and approved text over a hand-built lookalike.
- `InputDate` collapses its selectable range to today if `minDate/maxDate` are omitted and is fully controlled through the misleading `defaultDate` prop.
- The current Header hardcodes step metadata and links the logo to `/`; visual verification must ensure it matches this first-page Figma without duplicate chrome. The feature does not add logo navigation behavior.
- `NEXT_PUBLIC_COUNTRY` is build-time configuration. Country-specific E2E scenarios require separate process/build configuration or a controlled test setup.
- Playwright currently discovers only `test/ui`; contract/store tests need discovery widened or must be exercised through UI tests.
- `homero.config.json` still contains pnpm-flavored Playwright CLI commands from initialization despite npm discovery; run Homero Playwright setup before final evidence.
- The stylesheet package and npm component package release independently; verify the loaded Tomaco CSS supports every utility/token in the browser.

## Verification plan

- lint: `npm run lint`.
- typecheck: `npx tsc --noEmit`.
- test: `npm run test:e2e` after test discovery covers the mirrored suites; focused runs target the new form/local quote specs.
- e2e: `npm run test:e2e` with country configuration scenarios for CL, CO, and PE.
- build: `npm run build` because Next.js 16 client boundaries and dynamic imports can fail only during RSC/build processing.
- visual/design check: compare desktop `1280px` to the approved base/advisor/error/dialog nodes with threshold `0.01`; validate mobile `375px` against the approved adaptation (gutters, overflow, order, dialog behavior).
- Playwright CLI scenarios and evidence paths: session `homero-FEAT-001`; save paired screenshots/snapshots under `features/FEAT-001/evidence/{screenshots,snapshots}/` for `cl-pristine-desktop`, `cl-validation-errors-desktop`, `cl-underage-desktop`, `cl-advisor-tooltip-desktop`, `cl-dialog-tabs-desktop`, `cl-success-desktop`, `cl-pristine-mobile`, `cl-dialog-mobile`, `co-success-desktop`, and `pe-success-desktop`; register all in `features/FEAT-001/evidence/playwright-cli.json`.
- Security assertions: inspect browser storage and captured evidence to verify PII is absent; assert `quoteLocally` receives only country.
- Final gates: `node scripts/homero/homero.mjs feature check --target . --id FEAT-001` before implementation and `node scripts/homero/homero.mjs verify --target . --id FEAT-001` only after implementation/evidence.
