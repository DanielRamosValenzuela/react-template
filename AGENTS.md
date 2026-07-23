<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Falabella Seguros Starter Rules

- Do not add Tailwind CSS or CSS Modules. Use Tomaco CSS classes and `tomaco-components`.
- Keep product-specific behavior outside shared components; branch by country under `src/ui/{country}`.
- New forms must have schema, hook, view, store values, and a matching contract under `src/contracts/forms`.
- The country/form resolver is `src/config/CountryFormResolver.tsx`; do not reintroduce ambiguous `CountrySpecificForm` naming.
- Import simple design-system components directly from `tomaco-components`.
- Any file that imports from `tomaco-components` needs `'use client'` at the top, even if the file itself uses no hooks — the package's bundle calls `createContext` without declaring a client boundary, which breaks Server Component builds otherwise.
- Put React Hook Form integrations in `src/widgets/form-controls`, not in `lib/components/atoms`.
- Keep complete forms in `src/ui/{country}/{FormName}`, not in `src/widgets`.
- `leadCapture`, `quotation`, `personalInfo`, and `payment` are the active starter form examples by default.
- Use `src/widgets/StepActions` (wraps `tomaco-components`' `ActionsFooter`) for any screen with a combined back/continue footer, instead of separate `Button`/`BackButton` elements. `BackButton` alone is only for screens with no matching "continue" action (e.g. quotation, where hiring a plan card is the advance action).
- If a form doesn't vary in structure between countries (only in data, e.g. payment methods), keep a single implementation under `src/ui/global/{FormName}` instead of forking it into `cl`/`co`/`pe`.
- Store reusable flow state in Zustand. Convert store values to backend payloads through contracts/builders.
- Use `src/widgets/Summary/PlanSummary` (`<PlanSummary step={FORM_NAMES.X} />`) on any screen that needs the order-summary sidebar — it already reads `QuotationStore` and resolves the right accumulated sections for that step. Don't wire `Summary` + `useSummarySections` by hand in a screen; that exact block was duplicated 4 times before `PlanSummary` existed. `Summary` itself stays a dumb, store-free wrapper around `tomaco-components`' `Summary` — only `PlanSummary` and `useSummarySections` know about stores. To add a new accumulating section, add one entry to `SUMMARY_SECTIONS_BY_STEP` and one entry to `sectionsByStep` in `src/widgets/Summary/summarySections.tsx`, keyed by `FORM_NAMES` — do not invent a separate step enum for this.
- `src/widgets/DetailRow` (label/value row) and `src/widgets/CardSectionTitle` (section title with the green underline) are small shared atoms used inside form cards and inside `summarySections.tsx` — reuse them instead of re-writing the `d-flex justify-content-between` / `border-bottom-green` markup inline. `src/widgets/ReadOnlyCard` is the bordered box for showing prior-step data read-only (e.g. document + birthdate carried over from lead capture). `src/widgets/FormSection` wraps `CardSectionTitle` + a `children` slot for a titled block inside a form card (e.g. "Datos del asegurado", "Dirección") — use it instead of hand-rolling the title + wrapper div.
- `src/widgets/StepLayout` is the shared two-column layout (`header` + main content + optional `summary` aside) for any step screen that needs an order summary alongside its form (`personalInfo`, `payment` today). Screens that don't need a summary (e.g. quotation's plan grid) don't use it.
- Mirror source paths under `test/`, for example `src/ui/cl/LeadCaptureForm` -> `test/ui/cl/LeadCaptureForm`.
- Keep `src/proxy.ts` self-contained. Do not import app modules into the proxy.
