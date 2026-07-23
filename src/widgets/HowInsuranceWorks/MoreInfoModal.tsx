'use client';

import { useState } from 'react';
import { Dialog, Tab } from 'tomaco-components';

interface MoreInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TABS = [
  {
    content:
      'Este producto cubre hospitalización, urgencia ambulatoria y consultas médicas según el plan contratado. Los montos y coberturas exactas se detallan en tu cotización.',
    idAnchor: 'coverage',
    text: 'Coberturas',
  },
  {
    content:
      'Puedes contratar, revisar el estado de tu solicitud o hacer efectivo un siniestro desde tu cuenta. El proceso de contratación se completa 100% en línea, sin papeleo.',
    idAnchor: 'how-it-works',
    text: 'Cómo funciona',
  },
];

export const MoreInfoModal = ({ isOpen, onClose }: MoreInfoModalProps) => {
  const [activeTab, setActiveTab] = useState(TABS[0].idAnchor);

  if (!isOpen) return null;

  return (
    <Dialog
      closeButton
      closeHandler={onClose}
      isFull
      isOpen={isOpen}
      size="medium"
      title="Conoce tu seguro"
    >
      <Tab
        actionAnchor={setActiveTab}
        activeTab={activeTab}
        tabs={TABS.map(({ idAnchor, text }) => ({ idAnchor, style: {}, text }))}
      />
      <p className="pt24 text-neutral60 line-height-1-5">
        {TABS.find((tab) => tab.idAnchor === activeTab)?.content}
      </p>
    </Dialog>
  );
};
