export interface Price {
  date: string;
  value: number;
}
export interface Changelog {
  name: string;
  releases: { id: number; tag_name: string; body: string }[];
}
