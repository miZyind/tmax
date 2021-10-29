import { formatISO, subYears } from 'date-fns';

export enum Code {
  E1VFVN30 = 'E1VFVN30',
  FUEVFVND = 'FUEVFVND',
  VNINDEX = 'VNINDEX',
  VCB = 'VCB',
}

interface Raw {
  data: { date: string; close: number }[];
}

export interface Price {
  date: string;
  value: number;
}

export type PriceMap = Record<Code, Price[]>;

const API_URL = 'https://finfo-api.vndirect.com.vn/v4';
const DATA_SIZE = 500;

const getPriceTypeByCode = (code: Code) => {
  switch (code) {
    case Code.VNINDEX:
      return 'vnmarket_prices';
    default:
      return 'stock_prices';
  }
};

export const fetchAnnualPrices = async (code: Code): Promise<Price[]> => {
  const YEAR_OFFSET = 1;
  const targetDate = subYears(new Date(), YEAR_OFFSET);
  const formattedDate = formatISO(targetDate, { representation: 'date' });
  const priceType = getPriceTypeByCode(code);
  const url = `${API_URL}/${priceType}?sort=date:asc&size=${DATA_SIZE}`;
  const input = `${url}&q=code:${code}~date:gte:${formattedDate}`;

  try {
    const response = await fetch(input);
    const raw = (await response.json()) as Raw;

    return raw.data.map(({ date, close }) => ({ date, value: close }));
  } catch {
    return [];
  }
};

export const fetchAllAnnualPrices = async () => {
  const codes = Object.values(Code);
  const prices = await Promise.all(codes.map(fetchAnnualPrices));

  return Object.fromEntries(codes.map((code, index) => [code, prices[index]]));
};
