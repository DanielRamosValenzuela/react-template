'use client';

import { Button } from 'tomaco-components';

interface BackButtonProps {
  onBack: () => void;
}

const BackButton = ({ onBack }: BackButtonProps) => (
  <Button
    iconColor="#3E4043"
    iconName="arrow-left"
    iconPosition="left"
    onClick={onBack}
    text="Volver"
    type="button"
    variant="transparent"
  />
);

export default BackButton;
