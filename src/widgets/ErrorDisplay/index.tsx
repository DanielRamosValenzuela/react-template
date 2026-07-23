'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { Button } from 'tomaco-components';

interface ErrorDisplayProps {
  title?: string;
  text?: ReactNode;
  onRetry?: () => void;
  primaryActionText?: string;
  onPrimaryAction?: () => void;
  imageAlt?: string;
}

const ErrorDisplay = ({
  title = 'Lo sentimos, algo salio mal',
  text = 'El servicio no esta disponible en este momento.\nPor favor intenta mas tarde.',
  onRetry,
  primaryActionText,
  onPrimaryAction,
  imageAlt = 'error',
}: ErrorDisplayProps) => {
  const { push } = useRouter();
  const actionHandler = onPrimaryAction ?? onRetry ?? (() => push('/'));
  const actionText =
    primaryActionText ?? (typeof onRetry === 'function' ? 'Reintentar' : 'Ir al inicio');

  return (
    <div
      className="d-flex flex-column align-items-center gap-40"
      style={{
        maxWidth: 736,
        width: '100%',
        margin: '0 auto',
        padding: 40,
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="d-flex flex-column align-items-center gap-32 w-100">
        <div className="d-flex flex-column align-items-center gap-16" style={{ maxWidth: 564 }}>
          <span
            className="text-center"
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: 'rgb(50 53 55)',
              letterSpacing: -0.56,
              lineHeight: 1.4,
            }}
          >
            {title}
          </span>
          <span
            className="text-center"
            style={{
              fontSize: 18,
              fontWeight: 400,
              color: 'rgb(50 53 55)',
              letterSpacing: -0.18,
              lineHeight: 1.5,
              whiteSpace: 'pre-line',
            }}
          >
            {text}
          </span>
        </div>
        <div style={{ padding: 10 }}>
          <Image
            alt={imageAlt}
            height={210}
            loading="eager"
            src="/global/error-illustration.svg"
            width={288}
          />
        </div>
      </div>
      <div className="d-flex flex-column align-items-center gap-16 w-100" style={{ maxWidth: 320 }}>
        <Button onClick={actionHandler} text={actionText} variant="primary" className="liquid" />
      </div>
    </div>
  );
};

export default ErrorDisplay;