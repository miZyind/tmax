import { formatISO, subDays } from 'date-fns';

import type { Price } from '#lib/model';

// SJC sits behind Cloudflare Managed Challenge, which blocks every
// server-side client (Node fetch, Netlify functions) but lets a real browser
// through. The endpoint answers with `access-control-allow-origin: *` and the
// form-encoded body keeps this a simple request (no preflight), so the price
// history is fetched directly from the visitor's browser instead of `/api`.
export const GOLD_PRICE_URL =
  'https://sjc.com.vn/GoldPrice/Services/PriceService.ashx';

const GOLD_PRICE_ID = '49';
const SUB_DAYS_OFFSET = 89;
const DATE_IDX = 0;
const VALUE_OFFSET = 1000;
const dateFormatter = new Intl.DateTimeFormat('vi-VN', {
  timeZone: 'Asia/Ho_Chi_Minh',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

interface GoldPriceHistory {
  data: { GroupDate: string; SellValue: number }[];
}

export default async function fetchGoldPrices(): Promise<Price[]> {
  const now = new Date();

  try {
    const response = await fetch(GOLD_PRICE_URL, {
      method: 'POST',
      body: new URLSearchParams({
        method: 'GetGoldPriceHistory',
        goldPriceId: GOLD_PRICE_ID,
        fromDate: dateFormatter.format(subDays(now, SUB_DAYS_OFFSET)),
        toDate: dateFormatter.format(now),
      }),
    });

    if (!response.ok) {
      return [];
    }

    const { data } = (await response.json()) as GoldPriceHistory;

    return data.map(({ GroupDate, SellValue }) => ({
      date: formatISO(new Date(Number(GroupDate.match(/\d+/gu)?.[DATE_IDX])), {
        representation: 'date',
      }),
      value: SellValue / VALUE_OFFSET,
    }));
  } catch {
    return [];
  }
}
