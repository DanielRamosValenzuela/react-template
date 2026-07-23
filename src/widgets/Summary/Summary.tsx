'use client';

import type { ReactNode } from 'react';
import { Summary as TomacoSummary } from 'tomaco-components';
import type { SummarySectionItem } from './summarySections';

interface SummaryProps {
  accoItems: SummarySectionItem[];
  badge?: boolean;
  badgeText?: string;
  legal?: ReactNode;
  price: string;
  priceDetail?: ReactNode;
  title: string;
}

export const Summary = ({
  accoItems,
  badge,
  badgeText,
  legal,
  price,
  priceDetail,
  title,
}: SummaryProps) => (
  <TomacoSummary
    accoItems={accoItems}
    accordeon
    badge={badge}
    badgeText={badgeText}
    legal={legal}
    price={price}
    priceDetail={priceDetail}
    summaryTitle="Resumen"
    summaryTitleMobile="Resumen"
    title={title}
  />
);
