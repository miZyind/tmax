import useSWR from 'swr';

import type { PriceMap } from './price-fetcher';

export const fetcher = async (url: string) =>
  window.fetch(url).then((response) => response.json());

export const useCedict = () =>
  useSWR<Cedict>('/cedict.json', { revalidateOnFocus: false }).data;

export const usePrices = () =>
  useSWR<PriceMap>('/api/get-prices', { revalidateOnFocus: false }).data;
