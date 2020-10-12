import React, { Component } from 'react';
import styled from 'styled-components';

import GithubIcon from '#icons/github';
import NodeIcon from '#icons/node';
import ReactIcon from '#icons/react';
import SteamIcon from '#icons/steam';
import TypeScriptIcon from '#icons/type-script';
import UbuntuIcon from '#icons/ubuntu';

import {
  ELEMENT_PROP,
  ICON_SCALE_PROP,
  PADDING_SIZE,
  WINDOW_PROP,
} from './constant';
import Hexagon from './hexagon';

const SIZE_SCALE_PROP = 3;
const LOGO_SCALE_PROP = 2.5;

interface HexindProps extends StyledProps {}

interface HexindState {
  unit: number;
}

class Hexind extends Component<HexindProps, HexindState> {
  constructor(props: HexindProps) {
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
    const { className } = this.props;
    const { unit } = this.state;

    const unitX = unit * ELEMENT_PROP;
    const unitY = unit;
    const width = unitX * SIZE_SCALE_PROP;
    const height = unitY * SIZE_SCALE_PROP;
    const iconSize = unitX * ICON_SCALE_PROP;

    return (
      <div className={className} style={{ width, height }}>
        <Hexagon
          ux={unitX}
          uy={unitY}
          px={0}
          py={-1}
          color='rgba(51,153,51, 0.8)'
          scalable
        >
          <NodeIcon size={iconSize} />
        </Hexagon>
        <Hexagon
          ux={unitX}
          uy={unitY}
          px={1}
          py={-0.5}
          color='rgba(0,122,204, 0.8)'
          scalable
        >
          <TypeScriptIcon size={iconSize} />
        </Hexagon>
        <Hexagon
          ux={unitX}
          uy={unitY}
          px={1}
          py={0.5}
          color='rgba(97,218,251, 0.8)'
          scalable
        >
          <ReactIcon size={iconSize} />
        </Hexagon>
        <Hexagon
          ux={unitX}
          uy={unitY}
          px={0}
          py={1}
          color='rgba(233,84,32, 0.8)'
          scalable
        >
          <UbuntuIcon size={iconSize} />
        </Hexagon>
        <Hexagon
          ux={unitX}
          uy={unitY}
          px={-1}
          py={0.5}
          color='rgba(42, 71, 94, 0.8)'
          scalable
        >
          <SteamIcon size={iconSize} />
        </Hexagon>
        <Hexagon
          ux={unitX}
          uy={unitY}
          px={-1}
          py={-0.5}
          color='rgba(24,23,23, 0.8)'
          scalable
        >
          <GithubIcon size={iconSize} />
        </Hexagon>
        <Hexagon ux={unitX} uy={unitY} px={0} py={0} color='white'>
          <div
            className='mizyind'
            style={{
              width: iconSize * LOGO_SCALE_PROP,
              height: iconSize * LOGO_SCALE_PROP,
            }}
          />
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
    background-color: rgba(51, 153, 51, 0.8);
    clip-path: ${({
      theme: {
        clipPaths: { hexagon },
      },
    }) => hexagon};
  }

  .mizyind {
    border-radius: 50%;
    background-size: cover;
    background-image: url('/mizyind.png');
  }
`;
