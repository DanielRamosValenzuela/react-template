interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow = ({ label, value }: DetailRowProps) => (
  <div className="d-flex justify-content-between gap-16">
    <span className="text-neutral60">{label}</span>
    <span className="text-neutral80">{value}</span>
  </div>
);

export default DetailRow;
