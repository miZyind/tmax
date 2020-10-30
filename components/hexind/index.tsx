import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import GithubIcon from '#icons/github';
import HCTKIcon from '#icons/hctk';
import NodeIcon from '#icons/node';
import ReactIcon from '#icons/react';
import TypeScriptIcon from '#icons/typescript';
import UbuntuIcon from '#icons/ubuntu';

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

import type { Props as HexagonProps } from './hexagon';

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

interface Props extends StyledProps {
  onHCTKClick: HexagonProps['onClick'];
}

function Hexind({ className, onHCTKClick }: Props) {
  const unit = useUnit();
  const isLoaded = Boolean(unit);
  const unitX = unit * ELEMENT_PROP;
  const unitY = unit;
  const width = unitX * SIZE_SCALE_PROP;
  const height = unitY * SIZE_SCALE_PROP;
  const iconSize = unitX * ICON_SCALE_PROP;

  return (
    <div className={className} style={{ width, height }}>
      {isLoaded && (
        <>
          <Hexagon id={1} width={unitX} height={unitY}>
            <NodeIcon size={iconSize} />
          </Hexagon>
          <Hexagon id={2} width={unitX} height={unitY}>
            <TypeScriptIcon size={iconSize} />
          </Hexagon>
          <Hexagon id={3} width={unitX} height={unitY}>
            <ReactIcon size={iconSize} />
          </Hexagon>
          <Hexagon id={4} width={unitX} height={unitY}>
            <UbuntuIcon size={iconSize} />
          </Hexagon>
          <Hexagon id={5} width={unitX} height={unitY} onClick={onHCTKClick}>
            <HCTKIcon size={iconSize} />
          </Hexagon>
          <Hexagon id={6} width={unitX} height={unitY}>
            <GithubIcon size={iconSize} />
          </Hexagon>
        </>
      )}
      <Logo width={unitX} height={unitY} />
    </div>
  );
}

export default styled(Hexind)`
  margin: auto;
  position: relative;

  .hexagon {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    clip-path: ${({ theme }) => theme.clipPaths.hexagon};
  }
`;
