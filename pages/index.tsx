import React from 'react';
import styled from 'styled-components';

import Hexmizyind from '#components/hexmizyind';

const Index = ({ className }: StyledProps) => (
  <div className={className}>
    <Hexmizyind />
  </div>
);

export default styled(Index)`
  height: 100%;
  display: flex;
  align-items: center;

  &:before,
  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
  }

  &:before {
    @keyframes ani-background {
      0% {
        filter: brightness(0);
      }
      100% {
        filter: brightness(0.4);
      }
    }

    animation-name: ani-background;
    animation-duration: 1s;
    animation-timing-function: ease-in;

    filter: brightness(0.4);

    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('/background.jpg');
  }

  &:after {
    @keyframes ani-cloud {
      0% {
        background-position: 0px;
      }
      100% {
        background-position: 5440px;
      }
    }

    animation-name: ani-cloud;
    animation-duration: 5s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;

    filter: opacity(0.3);

    background-size: auto 100%;
    background-repeat: repeat;
    background-image: url('/cloud.png');
  }
`;
