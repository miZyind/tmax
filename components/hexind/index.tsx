import debounce from 'lodash/debounce';
import { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { DialogsContext, Name } from '#contexts/dialogs';
import AnalyticsIcon from '#icons/analytics';
import GithubIcon from '#icons/github';
import HCTKIcon from '#icons/hctk';
import NodeIcon from '#icons/node';
import ReactIcon from '#icons/react';
import TypeScriptIcon from '#icons/typescript';

import {
  ELEMENT_PROP,
  ICON_SCALE_PROP,
  INITIAL_UNIT,
  PADDING,
  SIZE_SCALE_PROP,
  UPDATE_UNIT_DELAY,
  WINDOW_PROP,
} from './constant';
import Hexagon from './hexagon';
import Logo from './logo';

function useUnit() {
  const [unit, setUnit] = useState(INITIAL_UNIT);

  useEffect(() => {
    const updateUnit = () =>
      setUnit(
        (Math.min(window.innerWidth, window.innerHeight) - PADDING) *
          WINDOW_PROP,
      );
    const debouncedUpdateUnit = debounce(updateUnit, UPDATE_UNIT_DELAY);

    window.addEventListener('resize', debouncedUpdateUnit);

    updateUnit();

    return () => window.removeEventListener('resize', debouncedUpdateUnit);
  }, []);

  return unit;
}

function Hexind({ className }: StyledProps) {
  const { state, dispatch } = useContext(DialogsContext);
  const unit = useUnit();
  const isLoaded = Boolean(unit);
  const unitX = unit * ELEMENT_PROP;
  const unitY = unit;
  const width = unitX * SIZE_SCALE_PROP;
  const height = unitY * SIZE_SCALE_PROP;
  const iconSize = unitX * ICON_SCALE_PROP;
  const props = {
    width: unitX,
    height: unitY,
    animate: !Object.values(state).filter((isOpened) => isOpened).length,
  };
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
      {isLoaded && (
        <>
          <Hexagon id={1} {...props}>
            <NodeIcon size={iconSize} />
          </Hexagon>
          <Hexagon id={2} {...props}>
            <TypeScriptIcon size={iconSize} />
          </Hexagon>
          <Hexagon id={3} {...props}>
            <ReactIcon size={iconSize} />
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
      )}
      <Logo {...props} />
    </div>
  );
}

export default styled(Hexind)`
  margin: auto;
  position: relative;
`;
