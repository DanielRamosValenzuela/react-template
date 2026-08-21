import Image from 'next/image';
import { HOGAR_QUOTE_COPY } from './content';

export const HogarQuoteBanner = () => (
  <aside className="hogar-quote-banner" aria-label="Promoción Seguro de Hogar">
    <div className="hogar-quote-banner__inner d-flex align-items-center justify-content-between">
      <div className="hogar-quote-banner__message d-flex align-items-center gap-8">
        <Image
          alt=""
          aria-hidden="true"
          height={32}
          src="/cl/hogar/icon-home-banner.svg"
          width={32}
        />
        <div className="hogar-quote-banner__copy">
          <span>{HOGAR_QUOTE_COPY.bannerPrefix}</span>
          <strong className="hogar-quote-banner__desktop-copy">
            {HOGAR_QUOTE_COPY.bannerDesktop}
          </strong>
          <strong className="hogar-quote-banner__mobile-copy">
            {HOGAR_QUOTE_COPY.bannerMobile}
          </strong>
        </div>
      </div>
      <div className="hogar-quote-banner__promotion d-flex align-items-center justify-content-end">
        <Image
          alt=""
          aria-hidden="true"
          className="hogar-quote-banner__promotion-desktop"
          height={44}
          priority
          src="/cl/hogar/hogar-promo-desktop.png"
          width={223}
        />
        <Image
          alt=""
          aria-hidden="true"
          className="hogar-quote-banner__promotion-mobile"
          height={34}
          priority
          src="/cl/hogar/hogar-promo-mobile.png"
          width={160}
        />
      </div>
    </div>
  </aside>
);
