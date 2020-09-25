/* eslint-disable @typescript-eslint/no-magic-numbers */
import React, { Component } from 'react';

import Hexagon from './hexagon';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

interface State {
  size: number;
}

export default class Hexmizyin extends Component<Props, State> {
  private readonly GAP = 1.2;

  private readonly MAXIMUM_SIZE = 160;

  private readonly SCALED;

  constructor(props: Props) {
    super(props);

    this.SCALED = this.GAP * 2 + 1;
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
    const { size } = this.state;
    const width = Math.sin(this.getRadians(1)) * size;
    const height = size;
    const elements = new Array(6).fill(null).map((_, i) => {
      const x = Math.sin(this.getRadians(i)) * size * this.GAP;
      // On the web, we need to reverse the y-coordinate
      const y = Math.cos(this.getRadians(i)) * size * this.GAP * -1;

      return (
        <Hexagon
          key={i}
          x={x + width * this.GAP}
          y={y + height * this.GAP}
          width={width}
          height={height}
        />
      );
    });

    return (
      <div
        style={{
          margin: 'auto',
          width: width * this.SCALED,
          height: height * this.SCALED,
        }}
      >
        {elements}
      </div>
    );
  }

  private updateSize() {
    const size = window.innerWidth / this.SCALED;

    this.setState({
      size: size > this.MAXIMUM_SIZE ? this.MAXIMUM_SIZE : size,
    });
  }

  private getRadians(i: number) {
    return 60 * (Math.PI / 180) * i;
  }
}
