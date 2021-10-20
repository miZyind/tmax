import { fetchAllAnnualPrices } from '../../utils/price-fetcher';

import type { NextApiHandler } from 'next';

export default async function getPrices(
  ...[, res]: Parameters<NextApiHandler>
) {
  const prices = await fetchAllAnnualPrices();

  res.json(prices);
}
