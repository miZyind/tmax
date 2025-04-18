import { formatISO, subDays, subYears } from 'date-fns';
import useSWR from 'swr';

import { Code } from '#lib/constant';
import fetcher from '#lib/fetcher';

import type { Price } from '#lib/model';

const SUB_DAYS_OFFSET = 89;
const SUB_YEARS_OFFSET = 1;
const DATE_IDX = 0;
const VALUE_OFFSET = 1000;

export const usePrices = () =>
  useSWR<Record<Code, Price[]>>('/api/get-prices', { revalidateOnFocus: false })
    .data;

export default async function handler(...[, res]: Handler) {
  const now = new Date();
  const codes = Object.values(Code);
  const prices = await Promise.all(
    codes.map(async (code: Code) => {
      if (code === Code.GOLD) {
        const url = 'https://sjc.com.vn/GoldPrice/Services/PriceService.ashx';
        const formatter = new Intl.DateTimeFormat('vi-VN', {
          timeZone: 'Asia/Ho_Chi_Minh',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });

        try {
          const response = (await (
            await fetch(url, {
              method: 'POST',
              body: new URLSearchParams({
                method: 'GetGoldPriceHistory',
                goldPriceId: '49',
                fromDate: formatter.format(subDays(now, SUB_DAYS_OFFSET)),
                toDate: formatter.format(now),
              }),
            })
          ).json()) as { data: { GroupDate: string; SellValue: number }[] };

          return response.data.map(({ GroupDate, SellValue }) => ({
            date: formatISO(
              new Date(Number(GroupDate.match(/\d+/gu)?.[DATE_IDX])),
              { representation: 'date' },
            ),
            value: SellValue / VALUE_OFFSET,
          }));
        } catch {
          return [];
        }
      } else {
        const targetDate = subYears(now, SUB_YEARS_OFFSET);
        const formattedDate = formatISO(targetDate, { representation: 'date' });
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
      }
    }),
  );

  res.json(
    Object.fromEntries(codes.map((code, index) => [code, prices[index]])),
  );
}
