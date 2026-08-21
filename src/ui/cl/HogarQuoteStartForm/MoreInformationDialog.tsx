'use client';

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { Dialog, Tab } from 'tomaco-components';

interface InformationBlock {
  description: string[];
  lists?: {
    items: string[];
    label?: string;
  }[];
  title: string;
}

interface InformationGroup {
  blocks: InformationBlock[];
  title?: string;
}

const INFORMATION_TABS = [
  { idAnchor: 'coverages', style: {}, text: 'Coberturas y asistencias' },
  { idAnchor: 'glossary', style: {}, text: 'Glosario' },
] as const;

const INTRODUCTION_BLOCKS: InformationBlock[] = [
  {
    title: 'Protege lo que hay en tu hogar',
    description: [
      'Tu seguro protege muebles, electrodomésticos y objetos de uso personal, ayudándote a enfrentar imprevistos sin afectar tu tranquilidad. Además, cuenta con diferentes asistencias 24/7 ante emergencia en tu hogar.',
    ],
  },
  {
    title: 'Activa tu seguro de forma rápida y simple',
    description: [
      'Activa tu seguro en pocos pasos, de forma 100% digital y sin complicaciones. Tu protección comienza desde la contratación del seguro.',
    ],
  },
];

const COVERAGE_GROUPS: InformationGroup[] = [
  {
    blocks: [
      {
        title: 'Incendio.',
        description: [
          'Protege el contenido de tu hogar frente a daños causados por incendio, humo o acciones para controlar el fuego.',
          'También incluye daños provocados por:',
        ],
        lists: [
          {
            items: [
              'Rotura de cañerías',
              'Fenómenos naturales (viento, inundaciones, deslizamientos, nieve, entre otros)',
              'Impacto de vehículos o aeronaves',
              'Huelgas o desórdenes públicos',
            ],
          },
        ],
      },
      {
        title: 'Robo en la vivienda.',
        description: [
          'Te cubre en caso de robo dentro de tu hogar cuando haya fuerza o violencia.',
          'Incluye:',
        ],
        lists: [
          {
            items: [
              'Daños o destrucción de tus bienes durante el robo',
              'Daños a la vivienda provocados en el intento o ejecución del robo',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Asistencias',
    blocks: [
      {
        title: 'Plomería.',
        description: [
          'reparación de averías en instalaciones fijas de agua hasta por UF 1.5 por evento; 2 eventos al año.',
        ],
        lists: [
          {
            label: 'Ejemplos:',
            items: [
              'Reparación llaves con filtración de agua',
              'Destape wc, lavaplatos o tina',
              'Filtración en estanques de baño, sifones o cañerías visibles',
              'Cambio de grifería',
            ],
          },
        ],
      },
      {
        title: 'Cerrajería.',
        description: [
          'servicio de apertura de cerraduras inutilizadas o sin llaves, sólo en cerramientos exteriores de la vivienda hasta UF 1.5 por evento, 2 eventos al año.',
        ],
        lists: [
          {
            label: 'Ejemplos:',
            items: [
              'Apertura cerradura principal por pérdida o robo de llaves',
              'Apertura cerradura entrada principal por inutilización de la chapa por robo o intento de robo',
            ],
          },
        ],
      },
      {
        title: 'Vidriería.',
        description: [
          'Reemplazo de vidrios quebrados sólo en cerramientos exteriores de la vivienda, hasta UF 2 por evento, 2 eventos al año.',
        ],
        lists: [
          {
            label: 'Ejemplo:',
            items: [
              'Rotura de vidrios de puertas o ventanas exteriores que formen parte del perímetro horizontal del domicilio',
            ],
          },
        ],
      },
      {
        title: 'Electricidad.',
        description: [
          'Asistencia para restablecer fallas eléctricas básicas en el hogar, con un tope de UF 1.5 por evento y 2 eventos al año.',
        ],
        lists: [
          {
            label: 'Ejemplo:',
            items: [
              'Reparación de emergencia para restablecer el suministro eléctrico',
              'Reposición de enchufes, soquetes e interruptores',
              'Cambio de interruptores automáticos, diferenciales',
            ],
          },
        ],
      },
    ],
  },
];

const GLOSSARY_BLOCKS: InformationBlock[] = [
  {
    title: 'Deducible:',
    description: [
      'Es el monto que no cubre el seguro cuando ocurre un siniestro. Ese monto lo paga el cliente en cada evento.',
    ],
  },
  {
    title: 'Contenido asegurado:',
    description: [
      'Son los bienes que están dentro de la vivienda, como muebles, electrodomésticos y objetos personales de uso diario.',
    ],
  },
  {
    title: 'Monto asegurado:',
    description: [
      'Es el máximo que el seguro puede pagar en caso de siniestro, según el plan y las coberturas contratadas.',
    ],
  },
  {
    title: 'Tipo de asegurado:',
    description: [
      'Puede ser el propietario o arrendatario que vive en la vivienda. Esta persona será el titular del seguro.',
    ],
  },
];

const InformationBlocks = ({ blocks }: { blocks: InformationBlock[] }) =>
  blocks.map((block) => (
    <section className="d-flex flex-column gap-8" key={block.title}>
      <h3 className="body-l text-semibold text-neutral80">{block.title}</h3>
      {block.description.map((paragraph) => (
        <p className="body-l text-neutral60" key={paragraph}>
          {paragraph}
        </p>
      ))}
      {block.lists?.map((list) => (
        <div className="d-flex flex-column gap-8" key={list.label ?? list.items[0]}>
          {list.label ? <p className="body-l text-neutral60">{list.label}</p> : null}
          <ul className="hogar-information-dialog__list body-l text-neutral60">
            {list.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  ));

interface MoreInformationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const MoreInformationDialog = ({ isOpen, onClose }: MoreInformationDialogProps) => {
  const [activeTab, setActiveTab] = useState('coverages');
  const openerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    openerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const getFocusableElements = () => {
      const dialog = document.querySelector<HTMLElement>('[role="dialog"]');
      return dialog ? Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)) : [];
    };

    globalThis.requestAnimationFrame(() => getFocusableElements()[0]?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (
        ['Enter', ' '].includes(event.key) &&
        document.activeElement?.classList.contains('dialog__close-btn')
      ) {
        event.preventDefault();
        onClose();
        return;
      }

      const focusableElements = getFocusableElements();
      if (event.key !== 'Tab' || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      globalThis.requestAnimationFrame(() => openerRef.current?.focus());
    };
  }, [isOpen, onClose]);

  const handleTabChange = (tabId: string) => {
    if (!INFORMATION_TABS.some((tab) => tab.idAnchor === tabId)) return;

    setActiveTab(tabId);
    contentRef.current?.scrollTo({ top: 0 });
  };

  const handleTabKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

    event.preventDefault();
    const currentIndex = INFORMATION_TABS.findIndex((tab) => tab.idAnchor === activeTab);
    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? INFORMATION_TABS.length - 1
          : (currentIndex + (event.key === 'ArrowRight' ? 1 : -1) + INFORMATION_TABS.length) %
            INFORMATION_TABS.length;
    const nextTab = INFORMATION_TABS[nextIndex];

    handleTabChange(nextTab.idAnchor);
    const tabElements = event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]');
    tabElements[nextIndex]?.focus();
  };

  return (
    <Dialog
      className="hogar-information-dialog shadow-modal"
      closeButton
      closeHandler={onClose}
      closeOutside
      isOpen={isOpen}
      size="medium-stretched-height"
      title="Seguro de Hogar"
    >
      <span className="visually-hidden" id="dialog-title">
        Seguro de Hogar
      </span>
      <div className="hogar-information-dialog__content" ref={contentRef} tabIndex={0}>
        <p className="body-l text-neutral60 mb24">
          Protege lo que más te importa dentro de tu hogar frente a imprevistos como robos,
          incendios y otros daños.
        </p>
        <div className="d-flex flex-column gap-24 mb32">
          <InformationBlocks blocks={INTRODUCTION_BLOCKS} />
        </div>
        <div onKeyDown={handleTabKeyDown}>
          <Tab
            actionAnchor={handleTabChange}
            activeTab={activeTab}
            equalWidth
            id="hogar-information-tabs"
            tabs={[...INFORMATION_TABS]}
          />
        </div>
        <div
          aria-label={INFORMATION_TABS.find((tab) => tab.idAnchor === activeTab)?.text}
          className="d-flex flex-column gap-24 pt24"
          id={activeTab}
          role="tabpanel"
        >
          {activeTab === 'coverages' ? (
            COVERAGE_GROUPS.map((group, index) => (
              <div className="d-flex flex-column gap-24" key={group.title ?? index}>
                {group.title ? (
                  <h3 className="title-s text-semibold text-neutral80">{group.title}</h3>
                ) : null}
                <InformationBlocks blocks={group.blocks} />
              </div>
            ))
          ) : (
            <InformationBlocks blocks={GLOSSARY_BLOCKS} />
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default MoreInformationDialog;
