import styled from 'styled-components';

import { useLineChart } from '#utils/chart';

import type { Code, Price } from '#utils/price-fetcher';

interface Props extends StyledProps {
  code: Code;
  color: string;
  prices: Price[];
}

function PriceChart({ className, code, color, prices }: Props) {
  const labels = prices.map(({ date }) => date);
  const data = prices.map(({ value }) => value);
  const chartRef = useLineChart(code, color, labels, data);

  return <canvas className={className} ref={chartRef} />;
}

export default styled(PriceChart)`
  width: 50%;
  height: 50%;
`;
