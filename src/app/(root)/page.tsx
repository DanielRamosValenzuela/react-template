'use client';

import CountryFormResolver from '@/config/CountryFormResolver';
import { commonConfig } from '@/config/environment';
import { FORM_NAMES } from '@/config/forms';
import { Header, PageCard } from '@/widgets';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Header showProgress={false} />
      <PageCard className="hogar-quote-page">
        <h1 className="hogar-quote-title max-width-560 d-flex flex-column align-items-center w-100 text-center text-neutral80">
          <span className="px-20 text-semilight line-height-1-5">Cotizador de seguros de</span>
          <span className="hogar-quote-title__product title-xl text-regular d-flex align-items-center justify-content-center gap-12">
            <span aria-hidden="true" className="hogar-quote-title__icon">
              <Image
                alt=""
                className="hogar-quote-title__icon-background"
                height={40}
                src="/global/hogar/home-14201-circle.svg"
                width={40}
              />
              <Image
                alt=""
                className="hogar-quote-title__icon-glyph"
                height={25}
                src="/global/hogar/home-14201-glyph.svg"
                width={23}
              />
            </span>
            <span>Hogar</span>
          </span>
        </h1>
        <section className="d-flex flex-column w-100">
          <CountryFormResolver
            country={commonConfig.country}
            formName={FORM_NAMES.HOGAR_QUOTE_START}
          />
        </section>
      </PageCard>
    </>
  );
}
