'use client';

import { useConfig } from '@/contexts';
import { Header as TomacoHeader } from 'tomaco-components';

interface HeaderProps {
  showProgress?: boolean;
}

export const Header = ({ showProgress = true }: HeaderProps) => {
  const { country } = useConfig();
  const progressProps = showProgress
    ? {
        current: 0,
        stepName: `Producto de seguros ${country.toUpperCase()}`,
        total: 2,
      }
    : {};

  return (
    <TomacoHeader
      className="headerFirstPage position-sticky top-0"
      logoAlt="Falabella Seguros"
      logoLink={showProgress ? '/' : undefined}
      noMargin={false}
      {...progressProps}
    />
  );
};
