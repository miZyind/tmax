import { formatISO, subYears } from 'date-fns';
import useSWR from 'swr';

import { Code } from '#lib/constant';
import fetcher from '#lib/fetcher';
import fetchGoldPrices, { GOLD_PRICE_URL } from '#lib/gold';

import type { Price } from '#lib/model';

type StockCode = Exclude<Code, Code.GOLD>;
type StockPrices = Record<StockCode, Price[]>;

const SUB_YEARS_OFFSET = 1;
const SWR_OPTIONS = { revalidateOnFocus: false };
const codes = Object.values(Code);
const stockCodes = codes.filter(
  (code): code is StockCode => code !== Code.GOLD,
);

export const usePrices = (): Record<Code, Price[]> | undefined => {
  const { data: stocks } = useSWR<StockPrices>('/api/get-prices', SWR_OPTIONS);
  const { data: gold } = useSWR<Price[]>(
    GOLD_PRICE_URL,
    fetchGoldPrices,
    SWR_OPTIONS,
  );

  if (!stocks || !gold) {
    return undefined;
  }

  return Object.fromEntries(
    codes.map((code) => [code, code === Code.GOLD ? gold : stocks[code]]),
  ) as Record<Code, Price[]>;
};

export default async function handler(...[, res]: Handler) {
  const targetDate = subYears(new Date(), SUB_YEARS_OFFSET);
  const formattedDate = formatISO(targetDate, { representation: 'date' });
  const prices = await Promise.all(
    stockCodes.map(async (code) => {
      const type = code === Code.VNINDEX ? 'vnmarket_prices' : 'stock_prices';
      const url = `https://api-finfo.vndirect.com.vn/v4/${type}?sort=date:asc&size=500`;
      const input = `${url}&q=code:${code}~date:gte:${formattedDate}`;

      try {
        return (
          await fetcher<{
            data: { date: string; close: number }[];
          }>(input)
        ).data.map(({ date, close }) => ({ date, value: close }));
      } catch {
        return [];
      }
    }),
  );

  res.json(
    Object.fromEntries(stockCodes.map((code, index) => [code, prices[index]])),
  );
}
