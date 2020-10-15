import { Component } from 'react';
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
  LOGO_SCALE_PROP,
  PADDING_SIZE,
  SIZE_SCALE_PROP,
  WINDOW_PROP,
} from './constant';
import Hexagon from './hexagon';

import type { Props as HexagonProps } from './hexagon';

interface Props extends StyledProps {
  onHCTKClick: HexagonProps['onClick'];
}

interface State {
  unit: number;
}

class Hexind extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { unit: 0 };
  }

  componentDidMount() {
    this.updateUnit();

    window.addEventListener('resize', this.updateUnit.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateUnit.bind(this));
  }

  render() {
    const { className, onHCTKClick } = this.props;
    const { unit } = this.state;

    const isLoaded = Boolean(unit);
    const unitX = unit * ELEMENT_PROP;
    const unitY = unit;
    const width = unitX * SIZE_SCALE_PROP;
    const height = unitY * SIZE_SCALE_PROP;
    const iconSize = unitX * ICON_SCALE_PROP;
    const logoSize = iconSize * LOGO_SCALE_PROP;

    return (
      <div className={className} style={{ width, height }}>
        {isLoaded && (
          <>
            <Hexagon
              ux={unitX}
              uy={unitY}
              px={0}
              py={-1}
              color='rgba(51,153,51,0.8)'
            >
              <NodeIcon size={iconSize} />
            </Hexagon>
            <Hexagon
              ux={unitX}
              uy={unitY}
              px={1}
              py={-0.5}
              color='rgba(0,122,204,0.8)'
            >
              <TypeScriptIcon size={iconSize} />
            </Hexagon>
            <Hexagon
              ux={unitX}
              uy={unitY}
              px={1}
              py={0.5}
              color='rgba(97,218,251,0.8)'
            >
              <ReactIcon size={iconSize} />
            </Hexagon>
            <Hexagon
              ux={unitX}
              uy={unitY}
              px={0}
              py={1}
              color='rgba(233,84,32,0.8)'
            >
              <UbuntuIcon size={iconSize} />
            </Hexagon>
            <Hexagon
              ux={unitX}
              uy={unitY}
              px={-1}
              py={0.5}
              color='rgba(42,71,94,0.8)'
              onClick={onHCTKClick}
            >
              <HCTKIcon size={iconSize} />
            </Hexagon>
            <Hexagon
              ux={unitX}
              uy={unitY}
              px={-1}
              py={-0.5}
              color='rgba(24,23,23,0.8)'
            >
              <GithubIcon size={iconSize} />
            </Hexagon>
          </>
        )}
        <Hexagon ux={unitX} uy={unitY} px={0} py={0} color='white' fixed>
          <div className='logo' style={{ width: logoSize, height: logoSize }} />
        </Hexagon>
      </div>
    );
  }

  private updateUnit() {
    const minLength = Math.min(window.innerWidth, window.innerHeight);

    this.setState({ unit: (minLength - PADDING_SIZE) * WINDOW_PROP });
  }
}

export default styled(Hexind)`
  margin: auto;

  .hexagon {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    clip-path: ${({ theme }) => theme.clipPaths.hexagon};
  }

  .logo {
    border-radius: 50%;
    background-size: cover;
    background-image: url('/mizyind.png');
  }
`;
