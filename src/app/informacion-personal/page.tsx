import CountryFormResolver from '@/config/CountryFormResolver';
import { commonConfig } from '@/config/environment';
import { FORM_NAMES } from '@/config/forms';
import { Header } from '@/widgets';

const PersonalInfoPage = () => (
  <>
    <Header />
    <main className="wide-page-layout container-fluid d-flex flex-column align-items-center justify-content-center mx-auto max-width-1152 pb56">
      <CountryFormResolver country={commonConfig.country} formName={FORM_NAMES.PERSONAL_INFO} />
    </main>
  </>
);

export default PersonalInfoPage;
