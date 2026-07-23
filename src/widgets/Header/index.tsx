'use client';

import { useConfig } from '@/contexts';
import { Header as TomacoHeader } from 'tomaco-components';

export const Header = () => {
  const { country, productName } = useConfig();

  return (
    <TomacoHeader
      className="headerFirstPage position-sticky top-0"
      current={0}
      logoAlt="Falabella Seguros"
      logoLink="/"
      noMargin={false}
      stepName={`${productName} ${country.toUpperCase()}`}
      total={2}
    />
  );
};