'use client';

import { useState } from 'react';
import { Dialog } from 'tomaco-components';

interface FrequentlyAskedQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQ_ITEMS = [
  {
    answer:
      'Puedes cotizar y contratar en linea en pocos minutos. Completa tus datos, revisa los planes disponibles y elige la opcion que mejor se ajuste a tu hogar.',
    question: 'Como contrato mi seguro de hogar?',
  },
  {
    answer:
      'Depende del plan elegido. En general se incluyen coberturas por incendio, danos accidentales, robo y responsabilidad civil, segun condiciones del producto.',
    question: 'Que cubre este seguro?',
  },
  {
    answer:
      'Una vez contratado, recibiras el detalle de tu poliza y podras consultar la informacion del seguro desde los canales digitales de Seguros Falabella.',
    question: 'Donde puedo revisar el detalle de mi poliza?',
  },
  {
    answer:
      'Puedes reportar un siniestro desde los canales oficiales de atencion. Te guiaremos en los documentos y pasos necesarios para cada tipo de evento.',
    question: 'Que hago si tengo un siniestro?',
  },
];

export const FrequentlyAskedQuestionsModal = ({
  isOpen,
  onClose,
}: FrequentlyAskedQuestionsModalProps) => {
  if (!isOpen) return null;

  return (
    <Dialog
      closeButton
      closeHandler={onClose}
      isOpen={isOpen}
      size="medium"
      title="Preguntas frecuentes"
    >
      <div className="d-flex flex-column gap-16">
        {FAQ_ITEMS.map((item) => (
          <article className="border br-8 pt16 pb16 pl16 pr16" key={item.question}>
            <h3 className="px-16 text-semibold text-neutral80 line-height-1-5">{item.question}</h3>
            <p className="pt8 px-16 text-neutral60 line-height-1-5">{item.answer}</p>
          </article>
        ))}
      </div>
    </Dialog>
  );
};

export const FrequentlyAskedQuestions = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="pt24 pb16 d-flex flex-column align-items-center justify-content-center">
        <p className="px-16 text-neutral60 text-center line-height-1-5 letter-spacing-negative-16">
          Si tienes dudas sobre los seguros de hogar,
        </p>
        <button
          className="cursor-pointer text-avocado60 text-medium text-decoration-underline line-height-1-5 border-0 bg-transparent"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          revisa las preguntas frecuentes
        </button>
      </section>

      <FrequentlyAskedQuestionsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
