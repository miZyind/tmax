import dynamic from 'next/dynamic';
import { useCallback, useContext } from 'react';
import styled from 'styled-components';

import { Classes, Dialog } from '@blueprintjs/core';

import { DialogsContext, Name } from '#contexts/dialogs';
import { usePrices } from '#utils/swr';

import { Code } from '../../utils/price-fetcher';
import HeaderIcon from './header-icon';

const DIALOG = Name.Analytics;
const PriceChart = dynamic(() => import('./price-chart'));

function DialogAnalytics({ className }: StyledProps) {
  const { state, dispatch } = useContext(DialogsContext);
  const prices = usePrices();

  return (
    <Dialog
      className={`${className} ${Classes.DARK}`}
      isOpen={state[DIALOG]}
      onClose={useCallback(() => dispatch([DIALOG, false]), [dispatch])}
      icon={<HeaderIcon />}
      title='Analytics'
    >
      <div className={Classes.DIALOG_BODY}>
        {prices && (
          <>
            <div className='chart-group'>
              <PriceChart
                code={Code.E1VFVN30}
                color='#E67300'
                prices={prices[Code.E1VFVN30]}
              />
              <PriceChart
                code={Code.FUEVFVND}
                color='#FF9900'
                prices={prices[Code.FUEVFVND]}
              />
            </div>
            <div className='chart-group'>
              <PriceChart
                code={Code.VNINDEX}
                color='#5574A6'
                prices={prices[Code.VNINDEX]}
              />
              <PriceChart
                code={Code.VCB}
                color='#0099C6'
                prices={prices[Code.VCB]}
              />
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}

export default styled(DialogAnalytics)`
  padding: unset;
  min-width: 1000px;
  background-color: ${({ theme }) => theme.vars['$dark-gray4']};

  .${Classes.ICON} {
    pointer-events: none;
  }

  .chart-group {
    display: flex;
    column-gap: 20px;
    flex-direction: row;
  }
`;
