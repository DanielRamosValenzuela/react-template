import { LOCAL_QUOTE_GREETINGS, type LocalQuoteRequest, type LocalQuoteResult } from '@/contracts';
import type { TCountry } from '@/config/types';

export const quoteLocally = async <TCountryCode extends TCountry>({
  country,
}: LocalQuoteRequest<TCountryCode>): Promise<LocalQuoteResult<TCountryCode>> => ({
  country,
  greeting: LOCAL_QUOTE_GREETINGS[country],
});
