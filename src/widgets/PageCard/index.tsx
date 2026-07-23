import type { PropsWithChildren } from 'react';

interface PageCardProps extends PropsWithChildren {
  className?: string;
}

const PageCard = ({ children, className = '' }: PageCardProps) => (
  <main
    className={`only-card-page d-flex flex-column col-12 col-md-6 mx-auto pb40 max-width-560 ${className}`.trim()}
  >
    {children}
  </main>
);

export default PageCard;
