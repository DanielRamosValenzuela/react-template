export interface QuotationPlanMock {
  cardInfo: {
    detail: string;
    extended_detail?: string;
    title: string;
  }[];
  companyName: string;
  currency: string;
  discount?: string;
  id: string;
  localMonthlyPrice: string;
  price: string;
  promoTagText?: string;
  recomendedText?: string;
  subtitle: string;
  title: string;
}