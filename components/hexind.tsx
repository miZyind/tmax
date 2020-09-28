/* eslint-disable @typescript-eslint/no-magic-numbers */
import React, { Component } from 'react';
import styled from 'styled-components';

const WINDOW_PROP = 0.07;
const ELEMENT_PROP = 15 / 17;
const GAP = 1.2;
const BORDER_SIZE = 10;
const MAX_POS = 4;
const LENGTH_MULTIPLIER = 2;

interface HexagonProps {
  unit: readonly [number, number];
  pos: readonly [number, number];
}

const Hexagon = ({ unit: [unitX, unitY], pos: [x, y] }: HexagonProps) => (
  <div
    className='hexagon'
    style={{
      transform: `translate(${x * unitX * GAP}px, ${y * unitY * GAP}px)`,
      width: unitX * LENGTH_MULTIPLIER,
      height: unitY * LENGTH_MULTIPLIER,
    }}
  />
);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HexindProps extends StyledProps {}

interface HexindState {
  size: number;
}

class Hexind extends Component<HexindProps, HexindState> {
  constructor(props: HexindProps) {
    super(props);

    this.state = { size: 0 };
  }

  componentDidMount() {
    this.updateSize();

    window.addEventListener('resize', this.updateSize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize.bind(this));
  }

  render() {
    const { className } = this.props;
    const { size } = this.state;

    const unitX = size * LENGTH_MULTIPLIER * ELEMENT_PROP;
    const unitY = size * LENGTH_MULTIPLIER;
    const unit = [unitX, unitY] as const;

    return (
      <div
        className={className}
        style={{
          width: unitX * MAX_POS * GAP + unitX * LENGTH_MULTIPLIER,
          height: unitY * MAX_POS * GAP + unitY * LENGTH_MULTIPLIER,
        }}
      >
        <Hexagon unit={unit} pos={[2, 0]} />
        <Hexagon unit={unit} pos={[4, 1]} />
        <Hexagon unit={unit} pos={[4, 3]} />
        <Hexagon unit={unit} pos={[2, 4]} />
        <Hexagon unit={unit} pos={[0, 3]} />
        <Hexagon unit={unit} pos={[0, 1]} />
      </div>
    );
  }

  private updateSize() {
    const minLength = Math.min(window.innerWidth, window.innerHeight);
    const size = (minLength - BORDER_SIZE) * WINDOW_PROP;

    this.setState({ size });
  }
}

export default styled(Hexind)`
  margin: auto;

  .hexagon {
    position: absolute;
    background-color: rgba(1, 1, 1, 0.8);
    clip-path: polygon(0 25%, 50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%);
  }
`;
