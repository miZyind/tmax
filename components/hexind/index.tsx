import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import {
  ELEMENT_PROP,
  ICON_SCALE_PROP,
  INITIAL_UNIT,
  PADDING,
  SINGULARITY_SCALE_PROP,
  SIZE_SCALE_PROP,
  WINDOW_PROP,
} from '#components/hexind/constant';
import Hexagon from '#components/hexind/hexagon';
import Logo from '#components/hexind/logo';
import { DialogsContext, Name } from '#contexts/dialogs';
import AnalyticsIcon from '#icons/analytics';
import ChangelogTrackerIcon from '#icons/changelog-tracker';
import GithubIcon from '#icons/github';
import HCTKIcon from '#icons/hctk';
import NodeIcon from '#icons/node';
import SingularityIcon from '#icons/singularity';

const useUnit = () => {
  const [value, setValue] = useState(INITIAL_UNIT);

  useEffect(() => {
    const handle = () =>
      setValue(
        (Math.min(window.innerWidth, window.innerHeight) - PADDING) *
          WINDOW_PROP,
      );

    window.addEventListener('resize', handle);

    handle();

    return () => window.removeEventListener('resize', handle);
  }, []);

  return value;
};

function Hexind({ className }: StyledProps) {
  const router = useRouter();
  const { state, dispatch } = useContext(DialogsContext);
  const unit = useUnit();
  const animate = useMemo(
    () => Boolean(Object.values(state).filter((isOpened) => isOpened).length),
    [state],
  );
  const isLoaded = Boolean(unit);
  const unitX = unit * ELEMENT_PROP;
  const unitY = unit;
  const width = unitX * SIZE_SCALE_PROP;
  const height = unitY * SIZE_SCALE_PROP;
  const iconSize = unitX * ICON_SCALE_PROP;
  const props = { width: unitX, height: unitY, animate };
  const onSingularityClick = useCallback(
    () => router.push('/singularity'),
    [router],
  );
  const onChangelogTrackerClick = useCallback(
    () => router.push('/changelog-tracker'),
    [router],
  );
  const onAnalyticsClick = useCallback(
    () => dispatch([Name.Analytics, true]),
    [dispatch],
  );
  const onHCTKClick = useCallback(
    () => dispatch([Name.HCTK, true]),
    [dispatch],
  );

  return (
    <div className={className} style={{ width, height }}>
      {isLoaded ? (
        <>
          <Hexagon id={1} {...props} onClick={onSingularityClick}>
            <SingularityIcon
              className='singularity'
              size={iconSize * SINGULARITY_SCALE_PROP}
            />
          </Hexagon>
          <Hexagon id={2} {...props}>
            <NodeIcon size={iconSize} />
          </Hexagon>
          <Hexagon id={3} {...props} onClick={onChangelogTrackerClick}>
            <ChangelogTrackerIcon size={iconSize} />
          </Hexagon>
          <Hexagon id={4} {...props} onClick={onAnalyticsClick}>
            <AnalyticsIcon size={iconSize} />
          </Hexagon>
          <Hexagon id={5} {...props} onClick={onHCTKClick}>
            <HCTKIcon size={iconSize} />
          </Hexagon>
          <Hexagon id={6} {...props}>
            <GithubIcon size={iconSize} />
          </Hexagon>
        </>
      ) : null}
      <Logo {...props} />
    </div>
  );
}

export default styled(Hexind)`
  margin: auto;
  position: relative;
  .singularity {
    @keyframes ani-singularity {
      100% {
        transform: rotate(360deg);
      }
    }
    animation: ani-singularity 60s linear infinite;
  }
`;
