'use client';

import type { TCountry } from '@/config/types';
import { quoteLocally } from '@/mocks/global/hogar/quoteLocally';
import { useHogarQuoteStartStore } from '@/store';
import { Button } from 'tomaco-components';

export interface HogarLocalQuoteProps {
  country: TCountry;
}

const HogarLocalQuote = ({ country }: HogarLocalQuoteProps) => {
  const pending = useHogarQuoteStartStore((state) => state.pending);
  const result = useHogarQuoteStartStore((state) => state.result);
  const setPending = useHogarQuoteStartStore((state) => state.setPending);
  const setResult = useHogarQuoteStartStore((state) => state.setResult);

  const handleQuote = async () => {
    if (pending) return;

    setResult(null);
    setPending(true);

    try {
      setResult(await quoteLocally({ country }));
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <Button
        disabled={pending}
        loading={pending}
        onClick={handleQuote}
        text="Continuar"
        type="button"
        variant="primary"
      />
      {result?.country === country ? <p aria-live="polite">{result.greeting}</p> : null}
    </>
  );
};

export default HogarLocalQuote;
