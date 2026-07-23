# Falabella Seguros React Starter

Base Next.js para frontends de seguros Falabella. No usa Tailwind: el layout y los componentes deben apoyarse en Tomaco (`tomaco-components` + CSS CDN).

La estructura viene preparada para productos como hogar, vida, auto, salud u otros, con separacion por pais, stores persistentes y contratos por formulario.

## Estructura principal

```text
src/
├── app/                  # App Router y paginas
│   ├── (root)/           # Home del flujo, equivalente al root page de Salud
│   ├── loading.tsx       # Estado global de carga
│   ├── error.tsx         # Error boundary de ruta
│   ├── global-error.tsx  # Error boundary global
│   └── not-found.tsx     # 404 global
├── config/               # Pais, ambiente, providers, flujo y resolver de forms
├── contexts/             # Contextos publicos de configuracion
├── contracts/forms/      # Contratos de payload por formulario + store asociado
├── mocks/{country}/      # Respuestas mock por pais
├── store/                # Zustand stores persistentes
├── ui/{country}/         # Formularios y componentes especificos por pais
├── utils/                # Helpers client y funciones puras
└── widgets/              # Piezas reutilizables y controllers RHF + Tomaco
```

## Patron de formulario

Cada formulario debe tener:

```text
src/ui/{country}/{FormName}/
├── schema.ts
├── use{FormName}.ts
└── index.tsx
```

Y debe estar casado con:

- un store en `src/store/*Store`
- un contrato en `src/contracts/forms/*.contract.ts`
- un mock por pais en `src/mocks/{country}`
- una entrada en `src/config/CountryFormResolver.tsx`

El starter deja activos solo dos ejemplos por pais: `leadCapture` y `quotation`.
Los formularios completos viven en `src/ui/{country}`, incluso si comparten patrones.

El home (`/`) usa el layout de card unica de Salud: titulo, barra `Conoce como funcionan estos seguros` y card blanca con el formulario. La cotizacion de ejemplo vive en `/cotizacion` y usa `ProductCardFull` directo desde Tomaco con mocks por pais.

El boton `Continuar` del formulario inicial guarda el paso completado y avanza a `/cotizacion`.

## Multi-pais

El pais activo se define con `COUNTRY` o `NEXT_PUBLIC_COUNTRY` (`cl`, `co`, `pe`). Cada pais puede tener formularios, schemas, validaciones y mocks propios bajo `src/ui/{country}` y `src/mocks/{country}`.

## Contratos y mocks

Los contratos viven en `src/contracts/forms`. Cada contrato declara:

- `storeKey`: store que alimenta el formulario
- `buildPayload`: transformacion store -> payload backend
- `mockPath`: fixture esperado por pais
- `source`: `backend-contract`, `draft-contract` o `no-contract-exception`

El ejemplo incluido es `leadCaptureContract`, que transforma `LeadCaptureStore` en el payload base de lead/cotizacion.

## Componentes y widgets

Los componentes simples del design system se importan directo desde `tomaco-components`. Los componentes con logica adicional, como controllers de React Hook Form, viven en `src/widgets/form-controls`. Widgets reutilizables de pagina, como `Header`, viven en `src/widgets`.

## Playwright

La configuracion usa `webServer` y `baseURL` para levantar `next start` en `http://localhost:3002` durante los tests. `npm run test:e2e` ejecuta `next build` antes por medio de `pretest:e2e`.

Los tests espejan el path de `src`. Por ejemplo:

```text
src/ui/cl/LeadCaptureForm
test/ui/cl/LeadCaptureForm
```

```bash
npm run test:e2e
npm run test:e2e:ui
```

## Proxy de rutas

El starter incluye `src/proxy.ts` con una proteccion minima para el flujo `/` -> `/cotizacion`. En local queda desactivado por defecto (`NEXT_PUBLIC_ENVIRONMENT` ausente o `local`) para que el starter sea facil de probar. En ambientes no locales, `/cotizacion` requiere que el formulario inicial haya marcado la cookie de paso completado.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run test:e2e
```
