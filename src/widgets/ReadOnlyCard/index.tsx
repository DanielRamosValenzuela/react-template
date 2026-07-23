import DetailRow from '../DetailRow';

interface ReadOnlyCardField {
  label: string;
  value: string;
}

interface ReadOnlyCardProps {
  fields: ReadOnlyCardField[];
}

const ReadOnlyCard = ({ fields }: ReadOnlyCardProps) => (
  <div className="d-flex flex-column gap-8 border br-8 pt24 pb24 pl16 pr16">
    {fields.map((field) => (
      <DetailRow key={field.label} label={field.label} value={field.value} />
    ))}
  </div>
);

export default ReadOnlyCard;
