'use client';

import { useState } from 'react';
import { MoreInfoModal } from './MoreInfoModal';

const HowInsuranceWorks = () => {
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false);

  const handleOpenMoreInfoModal = () => {
    setIsMoreInfoModalOpen(true);
  };

  return (
    <>
      <div className="gap-16 br-top-8 pt16 pb16 pl24 pr24 bg-blueberry5 border d-flex flex-column w-100 d-md-flex flex-md-row align-items-md-center justify-content-md-between">
        <p className="px-18 text-semibold letter-spacing-negative-18 line-height-1-5">
          Conoce cómo funciona este seguro
        </p>
        <button
          className="px-16 cursor-pointer text-avocado60 text-medium text-decoration-underline letter-spacing-negative-16 line-height-1-5 text-regular border-0 bg-transparent"
          onClick={handleOpenMoreInfoModal}
          type="button"
        >
          Más información
        </button>
      </div>

      <MoreInfoModal
        isOpen={isMoreInfoModalOpen}
        onClose={() => setIsMoreInfoModalOpen(false)}
      />
    </>
  );
};

export default HowInsuranceWorks;
