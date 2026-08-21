# Feature spec: FEAT-001: Hogar Quote Root Page

## Feature contract

- Feature ID: FEAT-001
- Source of truth: `features/FEAT-001/feature.json`
- Working branch: `test/homero-5`
- Status: `ready`
- Country: Chile (`cl`) únicamente.
- Approved design version: `current-approved-2026-08-21`.

## Source inputs

- Figma URL: https://www.figma.com/design/ygl9QrEtz0s3nvLUyCzr1W/-HOGAR--Web-2.0?node-id=3165-14184&m=dev
- Desktop inicial: nodo `3165:14184`, frame `1280 × 1320`.
- Mobile inicial: nodo `3165:14757`, frame `360 × 1431`.
- Validación: `3165:16339`; límite técnico superior: `3165:16386`; edad inferior: `3165:16432`.
- Dialog: `3165:16815` y `3165:16842`.
- Product request: reemplazar el starter CL de `/` por el prototipo inicial del cotizador Seguro Hogar.
- Backend contract mode: `no-backend-exception`.
- Backend contract source: none. `Continuar` solo valida localmente.
- Countries or variants: `cl`.
- Stakeholders: decisiones de producto y diseño aprobadas por el humano el 2026-08-21.

## User stories

1. Como usuario de Chile, quiero ingresar y validar mis datos personales y de contacto para preparar el inicio de una futura cotización de Hogar.
2. Como usuario, quiero conocer coberturas, asistencias y términos principales antes de continuar.
3. Como usuario, quiero acceder a política de privacidad y preguntas frecuentes en destinos externos temporales.
4. Como usuario apoyado por un asesor, quiero reflejarlo mediante un switch local sin ingresar información adicional.

## Business rules

- Solo Chile está en alcance. RUT, `+56`, copy, legales, teléfonos y contenido comercial son chilenos.
- Se conserva `CountryFormResolver`; no se crea un `CountryResolver` paralelo.
- Todo el estado del formulario, advisor y diálogo es local y se descarta al desmontar o refrescar.
- No se usa Zustand, storage, backend, mocks, analytics ni logs con PII.
- RUT: eliminar puntos, guion y espacios, normalizar `k` a `K`, admitir cuerpo de 7 u 8 dígitos, validar dígito verificador por módulo 11 y mostrar formato habitual.
- Correo: validación estándar de Zod email.
- Teléfono: `+56` fijo fuera del valor editable; exactamente 9 dígitos, comenzando por `9`.
- Fecha: real y no futura. `InputDate` usa un rango técnico de entrada entre `1900-01-01` y hoy para conservar los ejemplos aprobados; Zod aplica por separado los umbrales de elegibilidad `hoy - 100 años` inclusive y `hoy - 19 años` inclusive. Los 100 años no son una edad máxima comercial.
- Una fecha anterior a `minDate` usa la alerta superior aprobada; una fecha posterior a `maxDate` usa la alerta de edad mínima. Ambas mantienen el formulario inválido.
- Consentimiento obligatorio sin error de campo; el mensaje agregado aparece bajo el CTA después de un submit inválido.
- El switch de asesor solo alterna un boolean local; no muestra código ni cambia la validación.
- El contenido comercial permanece local. Una integración CMS/BFF futura requiere otra feature.
- Se conserva literalmente el copy aprobado, incluidos errores editoriales y diferencias por breakpoint.

## UX and design requirements

- Desktop `1280`: banner `56px`, Header `88px`, contenido a `y=200`, columna `560px`, título `560 × 75`, gap `48px`, card inicial `560 × 841` y FAQ `40px` bajo la card.
- Mobile `360`: banner `56px`, Header `88px`, contenido `312px` con gutters `24px` a `y=184`, título `312 × 75`, gap `40px`, card `312 × 940` y FAQ `40px` bajo la card.
- Desktop usa “Conoce cómo funciona este seguro”; mobile usa “Conoce cómo funciona este seguros”.
- Banner desktop: “Contrata tu” y “Seguro de hogar facil y rápido”. Mobile: “Contrata tu” y “Seguro de Hogar”.
- Título: “Cotizador de seguros de” y “Hogar”.
- Fondo `#F4F7F9`; cabecera `#F3F5FC` con borde `#D4DCF4`; divisor `#E2E9EE`; CTA `#3B9326`.
- Maven Pro y `letter-spacing: 0` en estilos propios.
- Los overrides CSS quedan scoped bajo la superficie Hogar.
- Labels asociados, foco visible, orden de teclado, nombre accesible del diálogo y ausencia de overflow horizontal son obligatorios.

## Functional requirements

- `getInitialFormByCountry('cl')` devuelve `HOGAR_QUOTE`; CO/PE conservan `HELLO`.
- `/` calcula el formulario inicial, muestra el banner CL antes de `Header` y renderiza el formulario mediante `CountryFormResolver`.
- `Header` y `PageCard` se reutilizan; el logo mantiene `logoLink="/"`.
- `Continuar` usa `handleSubmit`. Un submit inválido enfoca y desplaza al primer inválido; uno válido ejecuta un callback vacío sin efectos observables.
- `Más información` abre el diálogo confirmado. FAQ no abre diálogo, contenido inline ni ruta interna.
- Los enlaces externos usan `target="_blank"` y `rel="noopener noreferrer"`.
- El click en política de privacidad detiene la propagación hacia el label del checkbox.
- Los assets promocionales y editoriales se sirven localmente desde `public/cl/hogar`.

## Interactive elements and field-level behavior

| Elemento | Requerido | Comportamiento y error literal |
| --- | --- | --- |
| RUT del asegurado | Sí | Placeholder “Ej: 12.345.678-9”; módulo 11; “Debes ingresar un RUT válido”. |
| Fecha de nacimiento | Sí | `InputDate` controlado con rango de entrada `1900-01-01`–hoy y elegibilidad separada de 100/19 años; “DD/MM/AAAA”; “Ingresa una fecha de nacimiento válida”. |
| Correo electrónico | Sí | “Ej: correo@email.com”; Zod email; “Debes ingresar un correo electrónico válido”. |
| Teléfono | Sí | Prefijo fijo `+56`, “987654321”; `^9\d{8}$`; “Debes ingresar un teléfono válido”. |
| Consentimiento | Sí | “Acepto que me contacten para terminar el proceso de contratación del seguro según la política de privacidad.” Sin error de campo. |
| Advisor | No | “Estoy recibiendo ayuda de un asesor”; boolean local, inicialmente apagado. |
| Continuar | Comando | Siempre visible y habilitado; validación local únicamente. |
| Más información | Comando | Abre `Dialog` en “Coberturas y asistencias”. |
| Preguntas frecuentes | Enlace | Abre `https://example.com/preguntas-frecuentes` en nueva pestaña. |

Mensaje agregado: “Completa la información solicitada para avanzar”.

Alerta inferior: “Para contratar este seguro debes ser mayor de 18 años de edad.”

Alerta de límite técnico: “Lamentamos informarte que superas el límite de edad para contratar este seguro. Para más información llamándonos al +56 22 390 6542”. El teléfono permanece como texto plano.

El `Dialog` abre con “Coberturas y asistencias”, cierra con X, Escape o click exterior, bloquea el body, usa scroll interno, restaura foco y al reabrir vuelve al primer tab y al inicio. Su copy común es:

- “Seguro de Hogar”.
- “Protege lo que más te importa dentro de tu hogar frente a imprevistos como robos, incendios y otros daños.”
- “Protege lo que hay en tu hogar”.
- “Tu seguro protege muebles, electrodomésticos y objetos de uso personal, ayudándote a enfrentar imprevistos sin afectar tu tranquilidad. Además, cuenta con diferentes asistencias 24/7 ante emergencia en tu hogar.”
- “Activa tu seguro de forma rápida y simple”.
- “Activa tu seguro en pocos pasos, de forma 100% digital y sin complicaciones. Tu protección comienza desde la contratación del seguro.”
- Tabs: “Coberturas y asistencias” y “Glosario”.

Coberturas y asistencias:

- **Incendio.** “Protege el contenido de tu hogar frente a daños causados por incendio, humo o acciones para controlar el fuego. También incluye daños provocados por:” Rotura de cañerías; Fenómenos naturales (viento, inundaciones, deslizamientos, nieve, entre otros); Impacto de vehículos o aeronaves; Huelgas o desórdenes públicos.
- **Robo en la vivienda.** “Te cubre en caso de robo dentro de tu hogar cuando haya fuerza o violencia. Incluye:” Daños o destrucción de tus bienes durante el robo; Daños a la vivienda provocados en el intento o ejecución del robo.
- **Plomería.** “reparación de averías en instalaciones fijas de agua hasta por UF 1.5 por evento; 2 eventos al año.” Ejemplos: Reparación llaves con filtración de agua; Destape wc, lavaplatos o tina; Filtración en estanques de baño, sifones o cañerías visibles; Cambio de grifería.
- **Cerrajería.** “servicio de apertura de cerraduras inutilizadas o sin llaves, sólo en cerramientos exteriores de la vivienda hasta UF 1.5 por evento, 2 eventos al año.” Ejemplos: Apertura cerradura principal por pérdida o robo de llaves; Apertura cerradura entrada principal por inutilización de la chapa por robo o intento de robo.
- **Vidriería.** “Reemplazo de vidrios quebrados sólo en cerramientos exteriores de la vivienda, hasta UF 2 por evento, 2 eventos al año.” Ejemplo: Rotura de vidrios de puertas o ventanas exteriores que formen parte del perímetro horizontal del domicilio.
- **Electricidad.** “Asistencia para restablecer fallas eléctricas básicas en el hogar, con un tope de UF 1.5 por evento y 2 eventos al año.” Ejemplos: Reparación de emergencia para restablecer el suministro eléctrico; Reposición de enchufes, soquetes e interruptores; Cambio de interruptores automáticos, diferenciales.

Glosario:

- **Deducible:** “Es el monto que no cubre el seguro cuando ocurre un siniestro. Ese monto lo paga el cliente en cada evento.”
- **Contenido asegurado:** “Son los bienes que están dentro de la vivienda, como muebles, electrodomésticos y objetos personales de uso diario.”
- **Monto asegurado:** “Es el máximo que el seguro puede pagar en caso de siniestro, según el plan y las coberturas contratadas.”
- **Tipo de asegurado:** “Puede ser el propietario o arrendatario que vive en la vivienda. Esta persona será el titular del seguro.”

## Backend contract and mock requirements

- Contract mode: `no-backend-exception`.
- Contract format and source: none.
- Mock states required: none; `registered=false`, `source=null`, `productionMockFallbackAllowed=false`.
- No se crean actions, payloads, builders, fixtures, requests ni estados remotos.
- Solo se usan valores sintéticos en tests/evidencia; nunca se registra, persiste o envía PII.
- Toda integración BFF futura requiere una feature separada respaldada por contrato.

## Edge cases

- RUT con puntos o sin puntos, guion, `K/k`, dígito incorrecto, cuerpo corto/largo y caracteres inválidos.
- Teléfono con prefijo escrito, espacios, letras, menos/más de nueve dígitos o primer dígito distinto de `9`.
- Fecha imposible, futura, año bisiesto, exactamente `hoy-100`, anterior por un día, exactamente `hoy-19` y posterior por un día.
- Consentimiento como único inválido, verificando foco sin helper de campo.
- Corrección de errores después de un submit y desaparición del mensaje agregado al quedar válido.
- Click del enlace de privacidad sin alternar el checkbox.
- Doble click de `Continuar` válido sin navegación, request, persistencia ni feedback.
- Cierre del `Dialog` por X, Escape y exterior; scroll profundo; reapertura con tab inicial/top y foco restaurado.
- Contenido largo del `Dialog` sin scroll horizontal.
- Banner mobile a `360px` sin desbordamiento y refresh que descarta valores locales.

## Acceptance criteria

1. CL resuelve `HOGAR_QUOTE` mediante `CountryFormResolver`; CO/PE conservan `HELLO`.
2. Desktop `1280px` y mobile `360px` reproducen sus nodos aprobados, incluido el copy específico de cada breakpoint.
3. Estado inicial, validaciones de los cuatro campos, consentimiento y alertas etarias coinciden con Figma.
4. RUT módulo 11, email, teléfono y límites técnicos de `InputDate` cubren las fronteras descritas.
5. Submit inválido muestra el mensaje agregado y enfoca el primer inválido; submit válido no produce efectos adicionales.
6. Advisor permanece local y sin validación adicional.
7. El diálogo reproduce ambos tabs y sus interacciones de cierre, scroll, reset y foco.
8. FAQ y privacidad abren sus URLs temporales en una pestaña nueva sin alterar el formulario.
9. No hay persistencia, requests, analytics, mocks ni exposición de PII.
10. La evidencia visual usa umbral `0.01` y no actualiza baselines automáticamente.

## Open questions

- Ninguna para este alcance.

## Out of scope

- Colombia y Perú para Hogar; navegación y pasos posteriores.
- BFF, server actions, contratos, payloads, mocks y estados remotos.
- Persistencia, analytics y tracking.
- FAQ interna y contenido de los nodos `3165:17128`/`3165:17117`.
- Edad máxima comercial; los 100 años son exclusivamente un límite técnico del calendario.
- CMS, contenido remoto, correcciones editoriales y reemplazo de URLs temporales.
- Refactors generales de proxy, layout, stores o widgets compartidos.
