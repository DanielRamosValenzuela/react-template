'use client';

import type { ReactNode } from 'react';
import { Icon } from 'tomaco-components';

interface SectionHeaderProps {
  icon: string;
  iconColor?: string;
  title: ReactNode;
}

const SectionHeader = ({ icon, iconColor = '#ffb31a', title }: SectionHeaderProps) => (
  <header className="mb40 d-flex col-12 max-width-736 gap-12 align-items-center">
    <Icon iconName={icon} iconColor={iconColor} />
    <h1 className="px-28 text-regular line-height-1-4 letter-spacing-negative-56">{title}</h1>
  </header>
);

export default SectionHeader;
