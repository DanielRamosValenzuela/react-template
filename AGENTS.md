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
- `hello` is the active starter form example by default (`src/ui/{cl,co,pe}/Hello`) — a minimal per-country greeting resolved through `CountryFormResolver`. Replace it with the first real form instead of building alongside it.
- If a form doesn't vary in structure between countries (only in data, e.g. payment methods), keep a single implementation under `src/ui/global/{FormName}` instead of forking it into `cl`/`co`/`pe`. `src/ui/global` is currently an empty placeholder (`.gitkeep`) since the starter has no country-invariant form yet.
- Store reusable flow state in Zustand. Convert store values to backend payloads through contracts/builders.
- `src/widgets/DetailRow` (label/value row) and `src/widgets/CardSectionTitle` (section title with the green underline) are small shared atoms used inside form cards — reuse them instead of re-writing the `d-flex justify-content-between` / `border-bottom-green` markup inline. `src/widgets/FormSection` wraps `CardSectionTitle` + a `children` slot for a titled block inside a form card (e.g. "Datos del asegurado", "Dirección") — use it instead of hand-rolling the title + wrapper div.
- Mirror source paths under `test/`, for example `src/ui/cl/Hello` -> `test/ui/cl/Hello`.
- Keep `src/proxy.ts` self-contained. Do not import app modules into the proxy.
