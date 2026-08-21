export const HOGAR_QUOTE_COPY = {
  advisor: 'Estoy recibiendo ayuda de un asesor',
  bannerDesktop: 'Seguro de hogar facil y rápido',
  bannerMobile: 'Seguro de Hogar',
  bannerPrefix: 'Contrata tu',
  birthDateLabel: 'Fecha de nacimiento',
  birthDatePlaceholder: 'DD/MM/AAAA',
  cardIntroDesktop: 'Conoce cómo funciona este seguro',
  cardIntroMobile: 'Conoce cómo funciona este seguros',
  continue: 'Continuar',
  emailLabel: 'Correo electrónico',
  emailPlaceholder: 'Ej: correo@email.com',
  faq: 'Preguntas frecuentes',
  generalInvalid: 'Completa la información solicitada para avanzar',
  insuredRutLabel: 'RUT del asegurado',
  insuredRutPlaceholder: 'Ej: 12.345.678-9',
  moreInformation: 'Más información',
  overTechnicalLimit:
    'Lamentamos informarte que superas el límite de edad para contratar este seguro. Para más información llamándonos al +56 22 390 6542',
  phoneLabel: 'Teléfono',
  phonePlaceholder: '987654321',
  privacyPrefix:
    'Acepto que me contacten para terminar el proceso de contratación del seguro según la ',
  privacyText: 'política de privacidad',
  title: 'Hogar',
  titlePrefix: 'Cotizador de seguros de',
  underMinimumAge: 'Para contratar este seguro debes ser mayor de 18 años de edad.',
} as const;

export const HOGAR_QUOTE_LINKS = {
  faq: 'https://example.com/preguntas-frecuentes',
  privacy: 'https://example.com/politica-de-privacidad',
} as const;

export const HOGAR_DIALOG_COPY = {
  activationDescription:
    'Activa tu seguro en pocos pasos, de forma 100% digital y sin complicaciones. Tu protección comienza desde la contratación del seguro.',
  activationTitle: 'Activa tu seguro de forma rápida y simple',
  contentsDescription:
    'Tu seguro protege muebles, electrodomésticos y objetos de uso personal, ayudándote a enfrentar imprevistos sin afectar tu tranquilidad. Además, cuenta con diferentes asistencias 24/7 ante emergencia en tu hogar.',
  contentsTitle: 'Protege lo que hay en tu hogar',
  description:
    'Protege lo que más te importa dentro de tu hogar frente a imprevistos como robos, incendios y otros daños.',
  glossaryTab: 'Glosario',
  coveragesTab: 'Coberturas y asistencias',
  title: 'Seguro de Hogar',
} as const;

export const HOGAR_COVERAGES = [
  {
    bullets: [
      'Rotura de cañerías',
      'Fenómenos naturales (viento, inundaciones, deslizamientos, nieve, entre otros)',
      'Impacto de vehículos o aeronaves',
      'Huelgas o desórdenes públicos',
    ],
    description:
      'Protege el contenido de tu hogar frente a daños causados por incendio, humo o acciones para controlar el fuego. También incluye daños provocados por:',
    title: 'Incendio',
  },
  {
    bullets: [
      'Daños o destrucción de tus bienes durante el robo',
      'Daños a la vivienda provocados en el intento o ejecución del robo',
    ],
    description:
      'Te cubre en caso de robo dentro de tu hogar cuando haya fuerza o violencia. Incluye:',
    title: 'Robo en la vivienda',
  },
  {
    bullets: [
      'Reparación llaves con filtración de agua',
      'Destape wc, lavaplatos o tina',
      'Filtración en estanques de baño, sifones o cañerías visibles',
      'Cambio de grifería',
    ],
    description:
      'reparación de averías en instalaciones fijas de agua hasta por UF 1.5 por evento; 2 eventos al año.',
    examplesLabel: 'Ejemplos:',
    title: 'Plomería',
  },
  {
    bullets: [
      'Apertura cerradura principal por pérdida o robo de llaves',
      'Apertura cerradura entrada principal por inutilización de la chapa por robo o intento de robo',
    ],
    description:
      'servicio de apertura de cerraduras inutilizadas o sin llaves, sólo en cerramientos exteriores de la vivienda hasta UF 1.5 por evento, 2 eventos al año.',
    examplesLabel: 'Ejemplos:',
    title: 'Cerrajería',
  },
  {
    bullets: [
      'Rotura de vidrios de puertas o ventanas exteriores que formen parte del perímetro horizontal del domicilio',
    ],
    description:
      'Reemplazo de vidrios quebrados sólo en cerramientos exteriores de la vivienda, hasta UF 2 por evento, 2 eventos al año.',
    examplesLabel: 'Ejemplo:',
    title: 'Vidriería',
  },
  {
    bullets: [
      'Reparación de emergencia para restablecer el suministro eléctrico',
      'Reposición de enchufes, soquetes e interruptores',
      'Cambio de interruptores automáticos, diferenciales',
    ],
    description:
      'Asistencia para restablecer fallas eléctricas básicas en el hogar, con un tope de UF 1.5 por evento y 2 eventos al año.',
    examplesLabel: 'Ejemplos:',
    title: 'Electricidad',
  },
] as const;

export const HOGAR_GLOSSARY = [
  {
    description:
      'Es el monto que no cubre el seguro cuando ocurre un siniestro. Ese monto lo paga el cliente en cada evento.',
    title: 'Deducible',
  },
  {
    description:
      'Son los bienes que están dentro de la vivienda, como muebles, electrodomésticos y objetos personales de uso diario.',
    title: 'Contenido asegurado',
  },
  {
    description:
      'Es el máximo que el seguro puede pagar en caso de siniestro, según el plan y las coberturas contratadas.',
    title: 'Monto asegurado',
  },
  {
    description:
      'Puede ser el propietario o arrendatario que vive en la vivienda. Esta persona será el titular del seguro.',
    title: 'Tipo de asegurado',
  },
] as const;
