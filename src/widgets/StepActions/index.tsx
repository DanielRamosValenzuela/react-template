'use client';

import { ActionsFooter } from 'tomaco-components';

interface StepActionsProps {
  continueText?: string;
  disabled?: boolean;
  loading?: boolean;
  onBack: () => void;
  onContinue: () => void;
}

const StepActions = ({
  continueText = 'Continuar',
  disabled,
  loading,
  onBack,
  onContinue,
}: StepActionsProps) => (
  <ActionsFooter
    backButton
    backOnClick={onBack}
    disabled={disabled}
    loading={loading}
    onClick={onContinue}
    primaryButton
    text={continueText}
  />
);

export default StepActions;
