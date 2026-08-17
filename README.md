# Falabella Seguros React Starter

Base Next.js para frontends de seguros Falabella. No usa Tailwind: el layout y los componentes deben apoyarse en Tomaco (`tomaco-components` + CSS CDN).

La estructura viene preparada para productos como hogar, vida, auto, salud u otros, con separacion por pais, stores persistentes y contratos por formulario. Hoy el starter trae un unico ejemplo minimo — un saludo por pais — para dejar la arquitectura visible sin arrastrar logica de negocio.

## Estructura principal

```text
src/
├── app/                  # App Router y paginas
│   ├── (root)/           # Home del flujo: resuelve y renderiza el ejemplo `hello`
│   ├── loading.tsx       # Estado global de carga
│   ├── error.tsx         # Error boundary de ruta
│   ├── global-error.tsx  # Error boundary global
│   └── not-found.tsx     # 404 global
├── config/               # Pais, ambiente, providers, flujo y resolver de forms
├── contexts/             # Contextos publicos de configuracion
├── contracts/forms/      # Tipos de contrato de payload por formulario + store asociado
├── mocks/{country}/      # Respuestas mock por pais (vacio por ahora, ver mas abajo)
├── store/                # Zustand stores persistentes
├── ui/{country}/         # Formularios y componentes especificos por pais
├── ui/global/            # Formularios que no varian entre paises (vacio por ahora)
├── utils/                # Helpers client y funciones puras
└── widgets/              # Piezas reutilizables y controllers RHF + Tomaco
```

## Patron de formulario

Un formulario completo debe tener:

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

El ejemplo activo hoy es `hello` (`src/ui/{cl,co,pe}/Hello`): un componente minimo sin schema, hook ni store propio, que sirve solo para demostrar el resolver funcionando. Es el punto de partida a reemplazar por el primer formulario real — no un patron a copiar tal cual, ya que un formulario real necesita las cinco piezas listadas arriba.

El home (`/`) usa el layout de card unica: `Header` + `PageCard` con el resolver adentro.

## Multi-pais

El pais activo se define con `COUNTRY` o `NEXT_PUBLIC_COUNTRY` (`cl`, `co`, `pe`). Cada pais puede tener formularios, schemas, validaciones y mocks propios bajo `src/ui/{country}` y `src/mocks/{country}`. Hoy `hello` solo varia el texto del saludo; el resto de la logica (validaciones, formatters) vive en `src/utils/functions` lista para reutilizarse cuando aparezca el primer formulario real.

## Contratos y mocks

Los contratos viven en `src/contracts/forms`. El unico archivo que sobrevive por ahora es `types.ts`, con la interfaz generica `FormContract` que declara:

- `storeKey`: store que alimenta el formulario
- `buildPayload`: transformacion store -> payload backend
- `mockPath`: fixture esperado por pais
- `source`: `backend-contract`, `draft-contract` o `no-contract-exception`

No hay ningun `*.contract.ts` concreto todavia — se agrega uno por formulario real, siguiendo esa interfaz. `src/mocks/{country}` esta vacio (`.gitkeep`) por la misma razon.

## Componentes y widgets

Los componentes simples del design system se importan directo desde `tomaco-components`. Los componentes con logica adicional, como controllers de React Hook Form, viven en `src/widgets/form-controls`. Widgets reutilizables de pagina, como `Header`, `PageCard`, `ErrorDisplay` y `LoaderComponent`, viven en `src/widgets`. `CardSectionTitle`, `DetailRow` y `FormSection` son atomos pequeños para armar secciones dentro de una card de formulario.

## Playwright

La configuracion usa `webServer` y `baseURL` para levantar `next start` en `http://localhost:3002` durante los tests. `npm run test:e2e` ejecuta `next build` antes por medio de `pretest:e2e`.

Los tests espejan el path de `src`. Por ejemplo:

```text
src/ui/cl/Hello
test/ui/cl/Hello
```

```bash
npm run test:e2e
npm run test:e2e:ui
```

## Proxy de rutas

El starter incluye `src/proxy.ts` con una proteccion minima por paso de flujo, mas la inyeccion de un header/cookie de trace-id. Hoy el flujo tiene un unico paso (`/`), asi que el guard de pasos no bloquea nada; queda listo para activarse en cuanto se agreguen mas paginas al flujo (`FLOW_STEPS` en `src/proxy.ts` y `FLOW_STEPS_BY_COUNTRY` en `src/config/constants/flowConfig.ts`). En local queda desactivado por defecto (`NEXT_PUBLIC_ENVIRONMENT` ausente o `local`).

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run test:e2e
```
