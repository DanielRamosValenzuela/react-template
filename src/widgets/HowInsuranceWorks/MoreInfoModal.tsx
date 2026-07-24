'use client';

import { useState } from 'react';
import { Dialog, Icon, Tab } from 'tomaco-components';

interface MoreInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MODAL_TABS = [
  { idAnchor: 'coverages', style: {}, text: 'Coberturas y asistencias' },
  { idAnchor: 'glossary', style: {}, text: 'Glosario' },
];

const BENEFITS = [
  {
    description:
      'Este seguro cubre tus muebles, electrodomésticos y objetos personales ante situaciones inesperadas, para que puedas vivir con mayor tranquilidad.',
    title: 'Protege lo que hay en tu hogar',
  },
  {
    description:
      'Activa tu seguro en pocos pasos, de forma 100% digital y sin complicaciones. Tu cobertura comienza 15 días después de contratar.',
    title: 'Activa tu seguro de forma rápida y simple',
  },
];

export const MoreInfoModal = ({ isOpen, onClose }: MoreInfoModalProps) => {
  const [activeTab, setActiveTab] = useState('coverages');

  if (!isOpen) return null;

  return (
    <Dialog
      closeButton
      closeHandler={onClose}
      isOpen={isOpen}
      size="medium"
      title="Seguro de Hogar"
    >
      <p className="text-neutral60 line-height-1-5">
        Protege lo que más te importa dentro de tu hogar frente a imprevistos como robos,
        incendios y otros daños.
      </p>

      <section className="pt24 d-flex flex-column gap-24">
        {BENEFITS.map((benefit, index) => (
          <article className="d-flex gap-16" key={benefit.title}>
            <div aria-hidden="true" className="flex-shrink-0 pr8">
              {index === 0 && <Icon iconColor="neutral70" iconName="home" />}
            </div>
            <div>
              <h3 className="px-18 text-semibold text-neutral80 line-height-1-5">
                {benefit.title}
              </h3>
              <p className="pt8 px-16 text-neutral60 line-height-1-5">
                {benefit.description}
              </p>
            </div>
          </article>
        ))}
      </section>

      <Tab
        actionAnchor={setActiveTab}
        activeTab={activeTab}
        className="pt24"
        equalWidth
        tabs={MODAL_TABS}
      />

      <section className="pt24 d-flex flex-column gap-24">
        {activeTab === 'coverages' ? (
          <>
              <article>
                <h3 className="px-18 text-semibold text-neutral80 line-height-1-5">
                  Incendio.
                </h3>
                <p className="pt8 px-16 text-neutral60 line-height-1-5">
                  Protege el contenido de tu hogar frente a daños causados por incendio, humo o
                  acciones para controlar el fuego.
                </p>
                <p className="pt16 px-16 text-neutral60 line-height-1-5">
                  También incluye daños provocados por:
                </p>
                <ul className="pt8 pl24 d-flex flex-column gap-8 text-neutral60 line-height-1-5">
                  <li>Rotura de cañerías .</li>
                  <li>
                    Fenómenos naturales (viento, inundaciones, deslizamientos, nieve, entre
                    otros).
                  </li>
                  <li>Impacto de vehículos o aeronaves.</li>
                  <li>Huelgas o desórdenes públicos.</li>
                </ul>
              </article>

              <article>
                <h3 className="px-18 text-semibold text-neutral80 line-height-1-5">
                  Robo en la vivienda.
                </h3>
                <p className="pt8 px-16 text-neutral60 line-height-1-5">
                  Te cubre en caso de robo dentro de tu hogar cuando haya fuerza o violencia.
                  Incluye:
                </p>
                <ul className="pt8 pl24 d-flex flex-column gap-8 text-neutral60 line-height-1-5">
                  <li>Daños o destrucción de tus bienes durante el robo.</li>
                  <li>Daños a la vivienda provocados en el intento o ejecución del robo</li>
                </ul>
              </article>

              <article>
                <h3 className="px-18 text-semibold text-neutral80 line-height-1-5">
                  Plomería.
                </h3>
                <p className="pt8 px-16 text-neutral60 line-height-1-5">
                  Reparación de averías en instalaciones fijas de agua hasta por UF 1.5 por
                  evento; 1 evento al año.
                </p>
              </article>

              <article>
                <h3 className="px-18 text-semibold text-neutral80 line-height-1-5">
                  Cerrajería.
                </h3>
                <p className="pt8 px-16 text-neutral60 line-height-1-5">
                  Servicio de apertura de cerraduras inutilizadas o sin llaves, sólo en
                  cerramientos exteriores de la vivienda hasta UF 1.5 por evento, 1 evento al
                  año.
                </p>
              </article>

              <article>
                <h3 className="px-18 text-semibold text-neutral80 line-height-1-5">
                  Vidriería.
                </h3>
                <p className="pt8 px-16 text-neutral60 line-height-1-5">
                  Reemplazo de vidrios quebrados sólo en cerramientos exteriores de la vivienda,
                  hasta UF 2 por evento, 1 evento al año.
                </p>
              </article>

              <article>
                <h3 className="px-18 text-semibold text-neutral80 line-height-1-5">
                  Electricidad.
                </h3>
                <p className="pt8 px-16 text-neutral60 line-height-1-5">
                  Asistencia para restablecer fallas eléctricas básicas en el hogar, con un tope
                  de UF 1.5 por evento y 1 evento al año.
                </p>
              </article>
          </>
        ) : (
          <dl className="d-flex flex-column gap-24">
              <div>
                <dt className="px-18 text-semibold text-neutral80 line-height-1-5">Deducible:</dt>
                <dd className="pt8 px-16 text-neutral60 line-height-1-5">
                  Es el monto que no cubre el seguro cuando ocurre un siniestro. Ese monto lo
                  paga el cliente en cada evento.
                </dd>
              </div>
              <div>
                <dt className="px-18 text-semibold text-neutral80 line-height-1-5">
                  Contenido asegurado:
                </dt>
                <dd className="pt8 px-16 text-neutral60 line-height-1-5">
                  Son los bienes que están dentro de la vivienda, como muebles, electrodomésticos
                  y objetos personales de uso diario.
                </dd>
              </div>
              <div>
                <dt className="px-18 text-semibold text-neutral80 line-height-1-5">
                  Monto asegurado:
                </dt>
                <dd className="pt8 px-16 text-neutral60 line-height-1-5">
                  Es el máximo que el seguro puede pagar en caso de siniestro, según el plan y
                  las coberturas contratadas.
                </dd>
              </div>
              <div>
                <dt className="px-18 text-semibold text-neutral80 line-height-1-5">
                  Tipo de asegurado:
                </dt>
                <dd className="pt8 px-16 text-neutral60 line-height-1-5">
                  Puede ser el propietario o arrendatario que vive en la vivienda. Esta persona
                  será el titular del seguro.
                </dd>
              </div>
          </dl>
        )}
      </section>
    </Dialog>
  );
};
