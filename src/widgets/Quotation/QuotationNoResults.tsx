import type { PropsWithChildren, ReactNode } from 'react';

interface QuotationNoResultsProps extends PropsWithChildren {
  title?: ReactNode;
}

export const QuotationNoResults = ({
  children,
  title = 'No encontramos planes disponibles por ahora.',
}: QuotationNoResultsProps) => (
  <div className="col-12 max-width-736">
    <p className="px-20 text-neutral80 line-height-1-5">{title}</p>
    {children}
  </div>
);
