import dynamic from 'next/dynamic';
import { useCallback, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Classes, Dialog } from '@blueprintjs/core';

import { DialogsContext, Name } from '#contexts/dialogs';
import AnalyticsIcon from '#icons/analytics';
import { usePrices } from '#utils/swr';

const DIALOG = Name.Analytics;
const PriceChart = dynamic(() => import('./price-chart'));

function DialogAnalytics({ className }: StyledProps) {
  const { state, dispatch } = useContext(DialogsContext);
  const { vars } = useContext(ThemeContext);
  const data = usePrices();
  const colors = [vars.$gold4, vars.$sepia4, vars.$blue4, vars.$cobalt4];

  return (
    <Dialog
      className={`${className} ${Classes.DARK}`}
      isOpen={state[DIALOG]}
      onClose={useCallback(() => dispatch([DIALOG, false]), [dispatch])}
      icon={<AnalyticsIcon size={20} />}
      title='Analytics'
    >
      <div className={Classes.DIALOG_BODY}>
        {data && (
          <div className='charts'>
            {Object.entries(data).map(([code, prices], index) => (
              <PriceChart
                key={code}
                code={code}
                prices={prices}
                color={colors[index]}
              />
            ))}
          </div>
        )}
      </div>
    </Dialog>
  );
}

export default styled(DialogAnalytics)`
  width: 100%;
  margin: unset;
  padding: unset;
  background-color: ${({ theme }) => theme.vars['$dark-gray4']};

  .${Classes.ICON} {
    pointer-events: none;
  }

  .charts {
    display: flex;
    flex-wrap: wrap;
  }
`;
