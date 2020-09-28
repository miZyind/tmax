import React from 'react';
import styled from 'styled-components';

import Hexind from '#components/hexind';

const Index = ({ className }: StyledProps) => (
  <div className={className}>
    <Hexind />
  </div>
);

export default styled(Index)`
  height: 100%;
  display: flex;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('/background.jpg');

  &:after {
    @keyframes ani-cloud {
      0% {
        background-position: 0px;
      }
      100% {
        background-position: 5440px;
      }
    }

    content: '';
    width: 100%;
    height: 100%;
    position: absolute;

    animation-name: ani-cloud;
    animation-duration: 150s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;

    filter: opacity(0.3);

    background-size: auto 100%;
    background-repeat: repeat;
    background-image: url('/cloud.png');
  }
`;
