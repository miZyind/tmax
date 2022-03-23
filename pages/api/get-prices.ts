import { formatISO, subYears } from 'date-fns';
import useSWR from 'swr';

import { Code, SUB_YEAR_OFFSET } from '#utils/constant';

import type { NextApiHandler } from 'next';
import type { Price } from '#utils/model';

export const usePrices = () =>
  useSWR<Record<Code, Price[]>>('/api/get-prices', { revalidateOnFocus: false })
    .data;

const handler: NextApiHandler = async (_, res) => {
  const codes = Object.values(Code);
  const prices = await Promise.all(
    codes.map(async (code: Code) => {
      const targetDate = subYears(new Date(), SUB_YEAR_OFFSET);
      const formattedDate = formatISO(targetDate, { representation: 'date' });
      const type = code === Code.VNINDEX ? 'vnmarket_prices' : 'stock_prices';
      const url = `https://finfo-api.vndirect.com.vn/v4/${type}?sort=date:asc&size=500`;
      const input = `${url}&q=code:${code}~date:gte:${formattedDate}`;

      try {
        const response = await fetch(input);
        const raw = (await response.json()) as {
          data: { date: string; close: number }[];
        };

        return raw.data.map(({ date, close }) => ({ date, value: close }));
      } catch {
        return [];
      }
    }),
  );

  res.json(
    Object.fromEntries(codes.map((code, index) => [code, prices[index]])),
  );
};

export default handler;
