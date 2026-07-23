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
- `leadCapture`, `quotation`, and `payment` are the active starter form examples by default.
- If a form doesn't vary in structure between countries (only in data, e.g. payment methods), keep a single implementation under `src/ui/global/{FormName}` instead of forking it into `cl`/`co`/`pe`.
- Store reusable flow state in Zustand. Convert store values to backend payloads through contracts/builders.
- `src/widgets/Summary` is the shared order-summary sidebar. It never reads a store directly — screens read their own store and pass `title`/`price`/etc as props. If a new step should show a summary section from a prior step (e.g. a future personal-info step), add one entry to `SUMMARY_SECTIONS_BY_STEP` and one entry to `sectionsByStep` in `src/widgets/Summary/summarySections.tsx`, keyed by `FORM_NAMES` — do not invent a separate step enum for this.
- `src/widgets/StepLayout` is the shared two-column layout (`header` + main content + optional `summary` aside) for any step screen that needs an order summary alongside its form (payment today). Screens that don't need a summary (e.g. quotation's plan grid) don't use it.
- Mirror source paths under `test/`, for example `src/ui/cl/LeadCaptureForm` -> `test/ui/cl/LeadCaptureForm`.
- Keep `src/proxy.ts` self-contained. Do not import app modules into the proxy.
