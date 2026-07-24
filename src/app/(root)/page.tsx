import CountryFormResolver from '@/config/CountryFormResolver';
import { commonConfig } from '@/config/environment';
import { FORM_NAMES } from '@/config/forms';
import { FrequentlyAskedQuestions, Header, HowInsuranceWorks, PageCard } from '@/widgets';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Header />
      <PageCard>
        <header className="text-center d-flex flex-column align-items-center justify-content-center gap-16 align-self-stretch only-card-page-header">
          <section className="text-center d-flex flex-column align-items-center justify-content-center gap-4 align-self-stretch">
            <span className="text-semilight text-neutral60 text-center px-20 line-height-1-5 letter-spacing-negative-16">
              Cotizador de seguros de
            </span>
            <div className="gap-12 d-flex align-items-center justify-content-center">
              <span
                aria-label="Hogar"
                className="position-relative d-block flex-shrink-0"
                role="img"
                style={{ height: 40, width: 40 }}
              >
                <Image
                  alt=""
                  height={40}
                  loading="eager"
                  src="/icons/home-big.svg"
                  style={{ inset: 0, position: 'absolute' }}
                  width={40}
                />
                <Image
                  alt=""
                  height={25}
                  loading="eager"
                  src="/icons/home-big-mark.svg"
                  style={{ left: '50%', position: 'absolute', top: '50%', transform: 'translate(-50%, -50%)' }}
                  width={23}
                />
              </span>
              <span className="text-regular text-neutral80 line-height-1-4 px-32 letter-spacing-negative-64">
                Hogar
              </span>
            </div>
          </section>
        </header>

        <section className="shadow-sm">
          <HowInsuranceWorks />

          <section className="starter-card-layout br-bottom-8 d-flex flex-column bg-white">
            <CountryFormResolver
              country={commonConfig.country}
              formName={FORM_NAMES.LEAD_CAPTURE}
            />
          </section>
        </section>
        <FrequentlyAskedQuestions />
      </PageCard>
    </>
  );
}
