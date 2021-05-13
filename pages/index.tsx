import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Button } from '@blueprintjs/core';

import HCTKDialog from '#components/hctk-dialog';
import Hexind from '#components/hexind';
import { CookieKey, get, set } from '#utils/cookie';

import type { GetServerSidePropsContext } from 'next';
import type { Settings } from '#utils/cookie';

interface Props extends StyledProps {
  settings: Settings;
}

function Index({ className, settings }: Props) {
  const [isHCTKOpen, setIsHCTKOpen] = useState(false);
  const [animate, setAnimate] = useState(settings.animate);

  return (
    <div className={className}>
      <Hexind onHCTKClick={useCallback(() => setIsHCTKOpen(true), [])} />
      <HCTKDialog
        isOpen={isHCTKOpen}
        onClose={useCallback(() => setIsHCTKOpen(false), [])}
      />
      <Button
        className='button-animation'
        icon='social-media'
        intent={animate ? 'primary' : 'none'}
        onClick={useCallback(() => {
          set(CookieKey.Settings, { animate: !animate });
          setAnimate(!animate);
        }, [animate])}
      />
    </div>
  );
}

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  return { props: { settings: get(CookieKey.Settings, ctx) } };
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

  .button-animation {
    top: 0;
    right: 0;
    margin: 5px 10px;
    position: absolute;

    &:focus {
      outline: unset !important;
    }
  }
`;
