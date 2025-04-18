import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import {
  ELEMENT_PROP,
  ICON_SCALE_PROP,
  SINGULARITY_SCALE_PROP,
  SIZE_SCALE_PROP,
} from '#component/hexind/constant';
import Hexagon from '#component/hexind/hexagon';
import Logo from '#component/hexind/logo';
import { Name, useDialogs } from '#context/dialogs';
import AnalyticsIcon from '#icon/analytics';
import ChangelogTrackerIcon from '#icon/changelog-tracker';
import GithubIcon from '#icon/github';
import HCTKIcon from '#icon/hctk';
import MediumIcon from '#icon/medium';
import SingularityIcon from '#icon/singularity';
import { useUnit } from '#lib/hook';

function Hexind({ className }: StyledProps) {
  const router = useRouter();
  const { state, dispatch } = useDialogs();
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
  const onMediumClick = useCallback(
    () => router.push('https://medium.com/mizyind-singularity'),
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
  const onGitHubClick = useCallback(
    () => router.push('https://github.com/miZyind'),
    [router],
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
          <Hexagon id={2} {...props} onClick={onMediumClick}>
            <MediumIcon size={iconSize} />
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
          <Hexagon id={6} {...props} onClick={onGitHubClick}>
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
