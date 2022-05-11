import clsx from 'classnames';
import { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Classes, Colors, Dialog, Spinner } from '@blueprintjs/core';

import { usePrices } from '#api/get-prices';
import { DialogsContext, Name } from '#contexts/dialogs';
import AnalyticsIcon from '#icons/analytics';

import PriceChart from './price-chart';

import type { Code } from '#utils/constant';

const DIALOG = Name.Analytics;
const CHARTS_RENDER_DELAY = 500;
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
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useContext(DialogsContext);
  const colors = [Colors.GOLD4, Colors.SEPIA4, Colors.BLUE4, Colors.CERULEAN4];

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
  background-color: ${Colors.DARK_GRAY4};
  transition: opacity 0.3s cubic-bezier(0.54, 1.12, 0.38, 1.11);
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
