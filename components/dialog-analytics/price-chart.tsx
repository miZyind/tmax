import {
  CategoryScale,
  Chart,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { createRef, memo, useEffect, useState } from 'react';
import styled from 'styled-components';

import type { CartesianScaleOptions, Plugin } from 'chart.js';
import type { DeepPartial } from 'chart.js/types/utils';
import type { Code, Price } from '#utils/price-fetcher';

interface Props extends StyledProps {
  code: Code;
  prices: Price[];
  color: string;
}

const TEXT_COLOR = '#FFF';
const FRACTION_DIGITS = 2;
const X_SCALE_OPTIONS: DeepPartial<CartesianScaleOptions> = {
  grid: { display: false },
  ticks: {
    color: TEXT_COLOR,
    callback(value, i, ticks) {
      const FIRST = 0;
      const LAST = 1;
      const MIDDLE = 2;
      const THIRD = 3;
      const QUARTILE = 4;

      if (
        i === FIRST ||
        i === ticks.length - LAST ||
        i === Math.round(ticks.length / MIDDLE) ||
        i === Math.round(ticks.length / QUARTILE) ||
        i === Math.round((ticks.length / QUARTILE) * THIRD)
      ) {
        return this.getLabelForValue(value as number);
      }

      return null;
    },
  },
};
const Y_SCALE_OPTIONS: DeepPartial<CartesianScaleOptions> = {
  grid: { display: false },
  ticks: {
    padding: 0,
    backdropPadding: 0,
    color: TEXT_COLOR,
    font: { size: 14 },
    showLabelBackdrop: false,
    callback: (v) => (v as number).toFixed(FRACTION_DIGITS),
  },
  afterFit(axis) {
    axis.width = 62;
    axis.maxWidth = 62;
  },
};
const GUILDLINE_PLUGIN: Plugin = {
  id: 'guildline',
  beforeDatasetDraw({ ctx, chartArea, tooltip }) {
    if (tooltip?.dataPoints) {
      const [{ element }] = tooltip.dataPoints;

      if (element.active) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(element.x, chartArea.top);
        ctx.lineTo(element.x, chartArea.bottom);
        ctx.lineWidth = 2;
        ctx.strokeStyle = TEXT_COLOR;
        ctx.stroke();
        ctx.restore();
      }
    }
  },
};
const CHART_AREA_BORDER_PLUGIN: Plugin = {
  id: 'chartAreaBorder',
  afterDatasetsDraw({ ctx, chartArea }) {
    const { left, top, width, height } = chartArea;

    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = TEXT_COLOR;
    ctx.strokeRect(left, top, width, height);
    ctx.restore();
  },
};

function PriceChart({ className, code, prices, color }: Props) {
  const ref = createRef<HTMLCanvasElement>();
  const [chart, setChart] = useState<Chart | undefined>();

  useEffect(() => {
    (() => {
      if (ref.current && !chart) {
        const labels = prices.map(({ date }) => date);
        const data = prices.map(({ value }) => value);

        Chart.register(
          LineElement,
          PointElement,
          LineController,
          CategoryScale,
          LinearScale,
          Tooltip,
          Title,
        );

        setChart(
          new Chart(ref.current, {
            type: 'line',
            data: {
              labels,
              datasets: [
                { data, yAxisID: 'yl' },
                { data, yAxisID: 'yr' },
              ],
            },
            options: {
              responsive: false,
              animations: { numbers: false, visible: false },
              interaction: { mode: 'index', intersect: false },
              plugins: {
                title: {
                  text: code,
                  color: TEXT_COLOR,
                  display: true,
                  font: { size: 18 },
                },
                tooltip: {
                  padding: 10,
                  caretSize: 0,
                  mode: 'index',
                  cornerRadius: 0,
                  bodyColor: color,
                  intersect: false,
                  caretPadding: 10,
                  bodyAlign: 'center',
                  titleAlign: 'center',
                  titleColor: '#666',
                  displayColors: false,
                  titleMarginBottom: 10,
                  bodyFont: { size: 14 },
                  backgroundColor: TEXT_COLOR,
                  filter: (_, index) => !index,
                  titleFont: { size: 14, lineHeight: 1.75 },
                  callbacks: {
                    label: ({ raw }) =>
                      (raw as number).toFixed(FRACTION_DIGITS),
                  },
                },
              },
              elements: {
                point: {
                  radius: 0,
                  hoverBorderWidth: 2,
                  hoverBorderColor: TEXT_COLOR,
                  backgroundColor: color,
                },
                line: {
                  borderWidth: 2,
                  borderCapStyle: 'round',
                  borderColor: color,
                },
              },
              scales: {
                x: X_SCALE_OPTIONS,
                yl: {
                  ...Y_SCALE_OPTIONS,
                  position: 'left',
                  afterBuildTicks(axis) {
                    const INDEX = 1;
                    const [{ data: v }] = axis.chart.data.datasets;

                    axis.ticks = [{ value: v[INDEX] as number }];
                  },
                },
                yr: {
                  ...Y_SCALE_OPTIONS,
                  position: 'right',
                  afterBuildTicks(axis) {
                    const OFFSET = 1;
                    const [{ data: v }] = axis.chart.data.datasets;

                    axis.ticks = [{ value: v[v.length - OFFSET] as number }];
                  },
                },
              },
            },
            plugins: [GUILDLINE_PLUGIN, CHART_AREA_BORDER_PLUGIN],
          }),
        );
      }
    })();

    return () => chart?.destroy();
  }, [chart, code, color, prices, ref]);

  return <canvas className={className} ref={ref} />;
}

export default memo(styled(PriceChart)`
  width: 50%;

  @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
    width: 100%;
  }
`);
