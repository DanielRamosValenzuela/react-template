import CountryFormResolver from '@/config/CountryFormResolver';
import { getInitialFormByCountry } from '@/config/constants/flowConfig';
import { commonConfig } from '@/config/environment';
import { FORM_NAMES } from '@/config/forms';
import { HogarQuoteBanner } from '@/ui/cl/HogarQuoteForm/HogarQuoteBanner';
import { Header, PageCard } from '@/widgets';

export default function Home() {
  const formName = getInitialFormByCountry(commonConfig.country);
  const isChileHogarQuote = commonConfig.country === 'cl' && formName === FORM_NAMES.HOGAR_QUOTE;

  if (isChileHogarQuote) {
    return (
      <div className="hogar-quote-shell">
        <HogarQuoteBanner />
        <Header />
        <PageCard className="hogar-quote-page">
          <CountryFormResolver country={commonConfig.country} formName={formName} />
        </PageCard>
      </div>
    );
  }

  return (
    <>
      <Header />
      <PageCard>
        <section className="starter-card-layout br-bottom-8 d-flex flex-column bg-white shadow-sm">
          <CountryFormResolver country={commonConfig.country} formName={formName} />
        </section>
      </PageCard>
    </>
  );
}
