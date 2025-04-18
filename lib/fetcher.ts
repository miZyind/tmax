export default async function fetcher<T>(
  url: string,
  init?: RequestInit,
): Promise<T> {
  return fetch(url, init).then((response) => response.json() as Promise<T>);
}
