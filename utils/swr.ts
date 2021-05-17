import useSWR from 'swr';

async function fetcher(url: string) {
  return window.fetch(url).then((res) => res.json());
}

export function useCedict() {
  return useSWR<Cedict>('/cedict.json', fetcher, { revalidateOnFocus: false })
    .data;
}
