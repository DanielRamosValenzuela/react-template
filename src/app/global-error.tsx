'use client';

import { ErrorDisplay } from '@/widgets';

const GlobalError = ({ reset }: { error: Error; reset: () => void }) => (
  <html lang="es">
    <body style={{ background: '#f4f7f9', minHeight: '100vh' }}>
      <div className="d-flex justify-content-center" style={{ paddingTop: 56 }}>
        <ErrorDisplay onRetry={reset} />
      </div>
    </body>
  </html>
);

export default GlobalError;
