import clsx from 'classnames';
import dynamic from 'next/dynamic';
import { useCallback, useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Classes, Dialog, Spinner } from '@blueprintjs/core';

import { DialogsContext, Name } from '#contexts/dialogs';
import AnalyticsIcon from '#icons/analytics';
import { usePrices } from '#utils/swr';

const DIALOG = Name.Analytics;
const PriceChart = dynamic(() => import('./price-chart'));

function DialogAnalytics({ className }: StyledProps) {
  const data = usePrices();
  const { vars } = useContext(ThemeContext);
  const { state, dispatch } = useContext(DialogsContext);
  const [loading, setLoading] = useState(true);
  const colors = [vars.$gold4, vars.$sepia4, vars.$blue4, vars.$cobalt4];

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  return (
    <Dialog
      title='Analytics'
      isOpen={state[DIALOG]}
      icon={<AnalyticsIcon size={20} />}
      className={clsx(className, Classes.DARK)}
      onClose={useCallback(() => dispatch([DIALOG, false]), [dispatch])}
    >
      <div className={clsx(Classes.DIALOG_BODY)}>
        <Spinner className={clsx({ loading })} size={80} />
        {data && (
          <div className={clsx('charts', { loading })}>
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
  width: 80%;
  margin: unset;
  padding: unset;
  background-color: ${({ theme }) => theme.vars['$dark-gray4']};

  .${Classes.ICON} {
    pointer-events: none;
  }

  .${Classes.DIALOG_BODY} {
    display: flex;
    min-height: 50vh;
    position: relative;
    align-items: center;
    justify-content: center;
  }

  .${Classes.SPINNER} {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: none;
    transition: opacity 0.8s ease-in-out;

    &.loading {
      opacity: 1;
    }
  }

  .charts {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    opacity: 1;
    transition: opacity 0.8s ease-in-out;

    &.loading {
      opacity: 0;
    }
  }

  @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
    width: 100%;

    .${Classes.DIALOG_BODY} {
      margin: unset;
      min-height: 100vh;
    }
  }
`;
