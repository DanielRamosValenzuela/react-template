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
- Put React Hook Form integrations in `src/widgets/form-controls`, not in `lib/components/atoms`.
- Keep complete forms in `src/ui/{country}/{FormName}`, not in `src/widgets`.
- Only `leadCapture` and `quotation` are active starter form examples by default.
- Store reusable flow state in Zustand. Convert store values to backend payloads through contracts/builders.
- Mirror source paths under `test/`, for example `src/ui/cl/LeadCaptureForm` -> `test/ui/cl/LeadCaptureForm`.
- Keep `src/proxy.ts` self-contained. Do not import app modules into the proxy.
