import useSWR from 'swr';

export const fetcher = async (url: string) =>
  window.fetch(url).then((response) => response.json());

export const useCedict = () =>
  useSWR<Cedict>('/cedict.json', { revalidateOnFocus: false }).data;
