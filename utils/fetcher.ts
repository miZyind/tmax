export default async function fetcher<T>(url: string) {
  return fetch(url).then((response) => response.json() as Promise<T>);
}
