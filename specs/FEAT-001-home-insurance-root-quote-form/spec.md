# Feature spec: FEAT-001: Home Insurance Root Quote Form

## Feature contract

- Feature ID: FEAT-001
- Source of truth: `features/FEAT-001/feature.json`
- Working branch: `test/homero-4`, the existing branch used by `homero feature create`

## Source inputs

- Figma URL or node: https://www.figma.com/design/ygl9QrEtz0s3nvLUyCzr1W/-HOGAR--Web-2.0?node-id=3165-14184&m=dev
- Figma approved version: live-observed-2026-08-20
- Product request: Replace the root starter greeting with the Home Insurance quote start experience. Chile receives the complete form; Colombia and Peru remain country-specific and receive a minimal local greeting result.
- Backend contract mode: no-backend-exception
- Backend contract source: not-applicable
- Countries or variants: `cl`, `co`, `pe`; the full Figma form and Chilean validation rules apply only to `cl`.
- Stakeholders: product/design approval is represented by the human-provided Figma node set; engineering owner remains the repository team.
- Additional approved Figma nodes: form/advisor/error `3165:17280`, `3165:17329`, `3165:17389`, `3165:16339`, `3165:16432`; information dialog `3165:16671`, `3165:16750`, `3165:16815`, `3165:16842`; behavior notes `3165:17379`, `3165:17384`, `3165:16324`, `3165:16329`, `3165:16334`, `3165:16745`.

## User stories

1. As a Chilean customer, I want to enter my identity and contact details so that I can start a home insurance quote.
2. As a customer, I want clear inline validation and age feedback so that I can correct the form without losing my data.
3. As a customer assisted by an advisor, I want to add the advisor code only when assistance is active.
4. As a customer, I want to review coverages, assistance details, and the glossary without leaving the quote form.
5. As a user in Chile, Colombia, or Peru, I want the local quote result to identify my configured country.

## Business rules

- The active country comes from the existing `COUNTRY`, then `NEXT_PUBLIC_COUNTRY`, configuration with `cl` as the existing invalid/missing fallback.
- Chile renders the complete quote-start form. Colombia and Peru render the country-aware minimal quote action and result; Chile also returns `Hola Chile` after a valid local quote.
- This prototype has no backend. A valid Chile payload is normalized and stored only in an in-memory Zustand store; the local quote function receives only the country and returns `Hola Chile`, `Hola Colombia`, or `Hola Perú`.
- RUT, date of birth, email, Chilean mobile number, and contact consent are mandatory.
- The customer must be at least 18 years old on the local calendar date. There is no maximum age.
- Advisor assistance is optional. Enabling it reveals a required, locally validated, ASCII alphanumeric advisor code of 1 to 8 characters. Disabling it clears the code.
- Personally identifiable data must not be written to Web Storage, devtools, logs, analytics, URL parameters, browser evidence, or the local quote request.
- The upper promotional banner and promotion eligibility are injected by Tag Manager and are outside this feature.
- No analytics events are implemented by this feature.

## UX and design requirements

- Use the approved live Figma state observed on 2026-08-20. Desktop source is the `1280px` frame set; mobile is an explicitly approved Falabella adaptation because no mobile Figma frame was supplied.
- Preserve the root composition and shared page chrome: one existing `Header`, then the title, `PageCard`, form, and FAQ link. Do not duplicate the header inside the country form.
- Desktop card width is `560px`; body content width is `480px`; card body padding is `40px`. Field blocks use `24px` vertical gaps and major blocks use `40px` gaps.
- Mobile baseline is `375px`, with `24px` page gutters, one content column, a responsive card, and the primary action in document flow.
- Omit the upper promotional banner completely. The page starts with the existing shared header and quote title.
- The information strip uses the singular copy `Conoce cómo funciona este seguro` and opens the approved two-tab dialog: `Coberturas y asistencias` and `Glosario`.
- The information dialog closes through its close control, backdrop, and Escape; traps focus while open, restores focus to the trigger, and scrolls internally when content exceeds its height.
- The FAQ link uses the temporary target `#preguntas-frecuentes` and does not invent another surface. The logo and omitted promotion are not feature interactions.
- Desktop visual comparison uses the base/error/advisor/dialog nodes and threshold `0.01`. Mobile validation checks the approved adaptation rather than claiming Figma parity.
- All interactive controls expose visible focus, associated labels, natural tab order, semantic checked state, and programmatic error relationships. Errors are announced without including entered PII.

## Functional requirements

- Replace the active `HELLO` starter form with a country-resolved home quote entry.
- Resolve `cl` to the complete Chile form and resolve `co`/`pe` to the shared minimal local quote view with country-specific copy/result data.
- Initialize React Hook Form with `mode: 'onTouched'` and focus the first invalid control after submit.
- Keep `Continuar` enabled in pristine and invalid states as shown by Figma. Set `loading` and `disabled` only while the local asynchronous quote is pending.
- On valid Chile submit, build and store the normalized Chile payload, invoke `quoteLocally({ country: 'cl' })`, and render `Hola Chile` as local success feedback.
- The Colombia and Peru quote actions invoke the same local function without PII and render `Hola Colombia` or `Hola Perú`.
- Do not issue HTTP requests, call a Server Action, retry, create idempotency keys, or model network/business/server errors.
- Keep form values after client-side validation errors and local submission. Do not restore them after refresh because the PII store is memory-only.
- Add the exact Figma Home assets to the project during implementation; do not use hidden Vida layers or the age-maximum node `3165:16386`.

## Interactive elements and field-level behavior

- `RUT del asegurado`: required text input; placeholder `Ej: 12.345.678-9`. Accept digits, optional dots, hyphen, and `K/k`; format progressively; validate Chilean modulus 11; normalize to digits without dots plus hyphen and uppercase check digit. Empty and malformed values use `Debes ingresar un RUT válido`.
- `Fecha de nacimiento`: required controlled date input with manual `DD/MM/AAAA` entry and calendar selection. Reject invalid dates, future dates, and customers younger than 18; serialize with local date parts to `YYYY-MM-DD`. Empty or malformed input uses `Ingresa una fecha de nacimiento válida`. Underage submit shows `Para contratar este seguro debes ser mayor de 18 años de edad.` above the CTA. There is no maximum age.
- `Correo electrónico`: required email input; placeholder `Ej: correo@email.com`; trim, lowercase, standard email validation, maximum 254 characters. Empty and malformed values use `Debes ingresar un correo electrónico válido`.
- `Teléfono`: required Chilean mobile input with fixed, non-editable `+56` prefix; placeholder `987654321`; accept and display the national number beginning with `9` followed by eight digits; normalize to `+569XXXXXXXX`. Empty and malformed values use `Debes ingresar un teléfono válido`.
- Contact consent: required unchecked checkbox with the Figma copy `Acepto que me contacten para terminar el proceso de contratación del seguro según la política de privacidad.` The policy text is a link with a temporary safe target. If unchecked during submit, use the form-level warning `Completa la información solicitada para avanzar` shown below the form/CTA; do not invent a separate inline legal error.
- `Estoy recibiendo ayuda de un asesor`: optional switch, off by default. Turning it on reveals `Código del asesor`; turning it off clears and unregisters the code.
- `Código del asesor`: required only while advisor assistance is on; placeholder `Ej: 12345678`; trim and accept 1-8 ASCII alphanumeric characters. Empty and malformed values use `Debes ingresar un código válido`.
- Advisor tooltip: opens beside the advisor code label and displays exactly `Código de asesor: Si estás siendo atendido por un ejecutivo, ingresa el código que te proporcione.` It must be reachable and dismissible with pointer, keyboard, and touch interactions.
- `Continuar`: submits the form, remains enabled before validation, focuses the first invalid control, and shows the general warning when required information is incomplete. During the local Promise it uses the Tomaco button loading state and is disabled; duplicate submission is ignored. Success stores the normalized payload in memory and renders the country greeting.
- `Más información`: opens Figma node `3165:16671` as a dialog with exactly two controlled tabs. `Coberturas y asistencias` uses node `3165:16815`; `Glosario` uses `3165:16842`. It has no third tab.
- Dialog close control/backdrop/Escape: closes the dialog and restores focus to `Más información`. Tab activation updates the visible panel and supports keyboard navigation.
- `preguntas frecuentes`: navigates to temporary same-page target `#preguntas-frecuentes`; no FAQ page, drawer, or modal is created.

## Backend contract and mock requirements

- Contract mode: `no-backend-exception`.
- Contract format: local TypeScript contract plus Zod validation; no API format.
- Exception: the prototype has no backend. Its local quote function receives `{ country }` only and returns `{ country, greeting }`.
- Chile payload: `{ country: 'cl', rut, birthDate, email, phone, consent: true, advisorCode? }`, with all values normalized as defined above.
- Local quote result: `cl -> Hola Chile`, `co -> Hola Colombia`, `pe -> Hola Perú`.
- Required local states: pending/loading and success for each country. Validation failures are produced locally by the form schema. Empty, network, business, and server responses do not apply.
- Mock strategy: deterministic local fixture/function under `src/mocks`, explicitly prototype/test-only and never a production fallback.
- Sensitive data policy: synthetic values only in fixtures/tests; no production identifiers, logs, persisted state, or PII passed to the local quote function.

## Edge cases

- RUT check digit `K/k`, pasted RUT with or without dots, and cursor-safe progressive formatting.
- Invalid calendar dates, future dates, leap dates, and the exact 18th-birthday boundary using local time without UTC date shifting.
- Email surrounding whitespace/case and 254-character limit.
- Phone pasted with `+56`, spaces, or hyphens is reduced to its nine-digit Chilean national form before validation; any non-mobile result is rejected.
- Advisor code is removed from form values and payload when the switch is turned off.
- Multiple clicks during local pending state produce one local quote operation.
- Dialog long content scrolls without scrolling content behind the overlay; focus returns to its trigger.
- Reload clears in-memory PII by design.

## Acceptance criteria

1. At desktop `1280px`, `/` for `cl` renders the shared header once, the Home quote title, a centered `560px` card without the promotional banner, all approved Chile fields, and the FAQ link.
2. At mobile `375px`, the page has `24px` side gutters, one column, no horizontal overflow, a responsive card/dialog, and a non-sticky CTA in document flow.
3. Submitting empty or malformed required fields keeps the CTA enabled afterward, focuses the first invalid control, shows the four exact field errors, and shows `Completa la información solicitada para avanzar` below the form.
4. A valid RUT is modulus-11 checked and stored without dots, with a hyphen and uppercase check digit.
5. A date representing fewer than 18 completed years shows `Para contratar este seguro debes ser mayor de 18 años de edad.`; an adult date has no maximum-age rejection and serializes to local `YYYY-MM-DD`.
6. Email is trimmed/lowercased; phone is stored as `+569XXXXXXXX`; required consent must be checked before local success.
7. Enabling advisor assistance reveals the required code and tooltip; invalid/empty code shows `Debes ingresar un código válido`; disabling assistance clears and omits the code.
8. During a valid local submit, `Continuar` is loading and disabled; success stores the normalized Chile payload in memory and displays `Hola Chile` without an HTTP request.
9. Country-specific local quote behavior returns and displays `Hola Colombia` for `co` and `Hola Perú` for `pe` without collecting or passing Chilean PII.
10. `Más información` opens the approved two-tab dialog, displays the correct panel for each tab, closes by control/backdrop/Escape, traps focus, restores trigger focus, and scrolls long content internally.
11. No PII is written to local/session storage, logs, analytics, URL parameters, local quote inputs, screenshots, or snapshots.
12. Automated checks and Playwright CLI evidence cover pristine, invalid, underage, advisor on/error, dialog/tabs, loading/success, all three countries, desktop, and mobile states.

## Open questions

- None. The supplied Figma nodes and the human's decisions resolve the implementation boundary. The mobile presentation is an approved adaptation, not an unprovided Figma baseline.

## Out of scope

- Backend/API integration, Server Actions, HTTP errors, retries, and idempotency.
- Tag Manager promotion/banner, promotion eligibility/vigency, and analytics.
- Maximum-age rejection and Figma node `3165:16386`.
- Persistent PII, back-navigation restoration after reload, and production contract payloads.
- A real privacy-policy URL or FAQ surface; both remain safe temporary links in this prototype.
- A third information-dialog tab, Colombia/Peru versions of the Chilean form, and subsequent quote steps.
