import type { PropsWithChildren, ReactNode } from 'react';

interface StepLayoutProps extends PropsWithChildren {
  header?: ReactNode;
  summary?: ReactNode;
}

const StepLayout = ({ children, header, summary }: StepLayoutProps) => (
  <main className="row">
    {header}
    <section className="col-12 col-md-7 col-lg-8">{children}</section>
    {summary && <aside className="col-12 col-md-5 col-lg-4 mt24 mt-md-0">{summary}</aside>}
  </main>
);

export default StepLayout;
