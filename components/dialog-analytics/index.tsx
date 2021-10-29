import clsx from 'classnames';
import dynamic from 'next/dynamic';
import { useCallback, useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Classes, Dialog, Spinner } from '@blueprintjs/core';

import { DialogsContext, Name } from '#contexts/dialogs';
import AnalyticsIcon from '#icons/analytics';
import { usePrices } from '#utils/swr';

import type { Code } from '#utils/price-fetcher';

const DIALOG = Name.Analytics;
const CHARTS_RENDER_DELAY = 500;
const PriceChart = dynamic(() => import('./price-chart'));
const StyledSpinner = styled(Spinner)`
  width: 100%;
  z-index: 30;
  position: absolute;

  .${Classes.SPINNER_HEAD} {
    stroke: white;
  }
`;

function DialogAnalytics({ className }: StyledProps) {
  const data = usePrices();
  const { vars } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useContext(DialogsContext);
  const colors = [vars.$gold4, vars.$sepia4, vars.$blue4, vars.$cobalt4];

  useEffect(() => {
    if (data && state[DIALOG] && loading) {
      setTimeout(() => setLoading(false), CHARTS_RENDER_DELAY);
    }
  }, [data, state, loading]);

  return (
    <>
      {state[DIALOG] && loading && <StyledSpinner size={80} />}
      <Dialog
        style={loading ? { opacity: 0 } : {}}
        title='Analytics'
        isOpen={state[DIALOG]}
        icon={<AnalyticsIcon size={20} />}
        className={clsx(className, Classes.DARK)}
        onClose={useCallback(() => dispatch([DIALOG, false]), [dispatch])}
      >
        <div className={Classes.DIALOG_BODY}>
          {data &&
            Object.entries(data).map(([code, prices], index) => (
              <PriceChart
                key={code}
                code={code as Code}
                prices={prices}
                color={colors[index]}
              />
            ))}
        </div>
      </Dialog>
    </>
  );
}

export default styled(DialogAnalytics)`
  opacity: 1;
  width: 60%;
  margin: unset;
  padding: unset;
  transition: opacity 0.3s
    ${({ theme }) => theme.vars['$pt-transition-ease-bounce']};
  background-color: ${({ theme }) => theme.vars['$dark-gray4']};

  .${Classes.ICON} {
    pointer-events: none;
  }

  .${Classes.DIALOG_BODY} {
    display: flex;
    flex-wrap: wrap;
    max-width: 100vw;
    align-items: center;
    justify-content: center;
  }

  ${({ theme }) => theme.queries.laptop} {
    width: 80%;
  }

  ${({ theme }) => theme.queries.tablet} {
    width: 100%;
    min-height: 100vh;

    .${Classes.DIALOG_BODY} {
      margin: unset;
    }
  }
`;
