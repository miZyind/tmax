import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Button } from '@blueprintjs/core';

import DialogAnalytics from '#components/dialog-analytics';
import DialogHCTK from '#components/dialog-hctk';
import Hexind from '#components/hexind';
import { DialogsProvider } from '#contexts/dialogs';
import { CookieKey, get, set } from '#utils/cookie';

import type { GetServerSidePropsContext } from 'next';
import type { Settings } from '#utils/cookie';

interface Props extends StyledProps {
  settings: Settings;
}

function Index({ className, settings }: Props) {
  const [animate, setAnimate] = useState(settings.animate);

  return (
    <div className={className}>
      <DialogsProvider>
        <Hexind />
        <DialogHCTK />
        <DialogAnalytics />
        <Button
          large
          icon='social-media'
          className='button-animation'
          intent={animate ? 'primary' : 'none'}
          onClick={useCallback(() => {
            set(CookieKey.Settings, { animate: !animate });
            setAnimate(!animate);
          }, [animate])}
        />
      </DialogsProvider>
    </div>
  );
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) => ({
  props: { settings: get(CookieKey.Settings, ctx) },
});

export default styled(Index)`
  height: 100%;
  display: flex;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('/background.jpg');
  &:after {
    @keyframes ani-cloud {
      100% {
        background-position: 5440px;
      }
    }
    animation: ani-cloud 150s linear infinite;
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
  }
`;
