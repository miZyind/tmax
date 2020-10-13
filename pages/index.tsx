import React from 'react';
import styled from 'styled-components';

import Hexind from '#components/hexind';

const Index = ({ className }: StyledProps) => (
  <div className={className}>
    <Hexind />
    <div className='cloud' />
  </div>
);

export default styled(Index)`
  height: 100%;
  display: flex;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('/background.jpg');

  .cloud {
    @keyframes ani-cloud {
      0% {
        background-position: 0px;
      }
      100% {
        background-position: 5440px;
      }
    }
    animation-name: ani-cloud;
    animation-duration: 150s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;

    width: 100%;
    height: 100%;
    opacity: 0.3;
    position: absolute;
    pointer-events: none;
    background-size: auto 100%;
    background-image: url('/cloud.png');
  }
`;
