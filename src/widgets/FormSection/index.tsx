import type { PropsWithChildren } from 'react';
import CardSectionTitle from '../CardSectionTitle';

interface FormSectionProps extends PropsWithChildren {
  title: string;
}

const FormSection = ({ children, title }: FormSectionProps) => (
  <div className="d-flex flex-column gap-16">
    <CardSectionTitle title={title} />
    {children}
  </div>
);

export default FormSection;
