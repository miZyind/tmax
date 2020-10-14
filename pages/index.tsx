import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import HCTK from '#components/hctk';
import Hexind from '#components/hexind';
import { load } from '#utils/hctk-loader';

interface Props extends StyledProps {
  cedict: Cedict;
}

const Index = ({ className, cedict }: Props) => {
  const [isHCTKOpen, setIsHCTKOpen] = useState(false);
  const handleOnHCTKClose = useCallback(() => setIsHCTKOpen(false), []);

  return (
    <div className={className}>
      <Hexind
        onHCTKClick={() => {
          setIsHCTKOpen((isOpen) => !isOpen);
        }}
      />
      <HCTK cedict={cedict} isOpen={isHCTKOpen} onClose={handleOnHCTKClose} />
    </div>
  );
};

export async function getStaticProps() {
  const cedict = await load();

  return { props: { cedict } };
}

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
    animation-name: ani-cloud;
    animation-duration: 150s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;

    content: '';
    width: 100%;
    height: 100%;
    opacity: 0.3;
    position: absolute;
    pointer-events: none;
    background-size: auto 100%;
    background-image: url('/cloud.png');
  }
`;
