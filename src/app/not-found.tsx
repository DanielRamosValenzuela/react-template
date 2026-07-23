'use client';

import { ErrorDisplay, Header } from '@/widgets';

const NotFound = () => (
  <div style={{ background: '#f4f7f9', minHeight: '100vh' }}>
    <Header />
    <div className="d-flex justify-content-center" style={{ paddingTop: 56 }}>
      <ErrorDisplay
        imageAlt="pagina no encontrada"
        primaryActionText="Volver al inicio"
        text="La ruta que buscas no existe en este starter."
        title="Pagina no encontrada"
      />
    </div>
  </div>
);

export default NotFound;