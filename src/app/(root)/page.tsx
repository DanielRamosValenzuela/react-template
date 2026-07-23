import CountryFormResolver from '@/config/CountryFormResolver';
import { commonConfig } from '@/config/environment';
import { FORM_NAMES } from '@/config/forms';
import { Header, PageCard } from '@/widgets';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Header />
      <PageCard>
        <header className="text-center d-flex flex-column align-items-center justify-content-center gap-16 align-self-stretch only-card-page-header">
          <section className="text-center d-flex flex-column align-items-center justify-content-center gap-4 align-self-stretch">
            <span className="text-semilight text-neutral60 text-center px-20 line-height-1-5 letter-spacing-negative-16">
              Cotizador de Seguro
            </span>
            <div className="gap-12 d-flex align-items-center justify-content-center">
              <Image
                src="/icons/health-big.svg"
                alt="Salud"
                width={40}
                height={40}
                loading="eager"
              />
              <span className="text-regular text-neutral80 line-height-1-4 px-32 letter-spacing-negative-64">
                Producto de seguros
              </span>
            </div>
          </section>
        </header>

        <section>
          <div className="gap-16 br-top-8 pt16 pb16 pl24 pr24 bg-blueberry5 border d-flex flex-column w-100 d-md-flex flex-md-row align-items-md-center justify-content-md-between">
            <p className="px-18 text-semibold letter-spacing-negative-18 line-height-1-5">
              Conoce cómo funcionan estos seguros
            </p>
            <p className="px-16 cursor-pointer text-avocado60 text-medium text-decoration-underline letter-spacing-negative-16 line-height-1-5 text-regular">
              Más información
            </p>
          </div>

          <section className="starter-card-layout br-bottom-8 d-flex flex-column bg-white shadow-sm">
            <CountryFormResolver
              country={commonConfig.country}
              formName={FORM_NAMES.LEAD_CAPTURE}
            />
          </section>
        </section>
      </PageCard>
    </>
  );
}
