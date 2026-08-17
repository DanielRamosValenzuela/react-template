import CountryFormResolver from '@/config/CountryFormResolver';
import { commonConfig } from '@/config/environment';
import { FORM_NAMES } from '@/config/forms';
import { Header, PageCard } from '@/widgets';

export default function Home() {
  return (
    <>
      <Header />
      <PageCard>
        <section className="starter-card-layout br-bottom-8 d-flex flex-column bg-white shadow-sm">
          <CountryFormResolver country={commonConfig.country} formName={FORM_NAMES.HELLO} />
        </section>
      </PageCard>
    </>
  );
}
