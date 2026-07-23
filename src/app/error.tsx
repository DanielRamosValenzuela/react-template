'use client';

import { ErrorDisplay, Header } from '@/widgets';

const Error = ({ reset }: { error: Error; reset: () => void }) => (
  <div style={{ background: '#f4f7f9', minHeight: '100vh' }}>
    <Header />
    <div className="d-flex justify-content-center" style={{ paddingTop: 56 }}>
      <ErrorDisplay onRetry={reset} />
    </div>
  </div>
);

export default Error;