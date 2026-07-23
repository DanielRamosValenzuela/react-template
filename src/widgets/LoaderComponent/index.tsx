'use client';

import { Loader } from 'tomaco-components';

const LoaderComponent = ({
  text = 'Esto puede tomar unos segundos',
  title = 'Cargando...',
}: {
  text?: string;
  title?: string;
}) => (
  <section
    className="d-flex flex-column align-items-center justify-content-center text-center"
    style={{ maxWidth: 320, margin: '0 auto', minHeight: 'calc(100vh - 250px)' }}
  >
    <Loader title={title} text={text} />
  </section>
);

export default LoaderComponent;
