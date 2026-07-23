interface CardSectionTitleProps {
  title: string;
}

const CardSectionTitle = ({ title }: CardSectionTitleProps) => (
  <div className="border-bottom-green pb16">
    <p className="px-20 text-semibold letter-spacing-negative-18 line-height-1-5">{title}</p>
  </div>
);

export default CardSectionTitle;
