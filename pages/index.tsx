import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Button } from '@blueprintjs/core';

import DialogAnalytics from '#component/dialog-analytics';
import DialogHCTK from '#component/dialog-hctk';
import Hexind from '#component/hexind';
import { DialogsProvider } from '#context/dialogs';
import { Key, get, set } from '#lib/cookie';
import { withPageTransitionDelay } from '#lib/hoc';

import type { Settings } from '#lib/cookie';

interface Props extends StyledProps {
  settings: Settings;
}

function Index({ className, settings }: Props) {
  const [animate, setAnimate] = useState(settings.animate);
  const onClick = useCallback(() => {
    set(Key.Settings, { animate: !animate });
    setAnimate(!animate);
  }, [animate]);

  return (
    <div className={className}>
      <DialogsProvider>
        <Hexind />
        <DialogHCTK />
        <DialogAnalytics />
        <Button
          size='large'
          onClick={onClick}
          icon='social-media'
          title='Toggle animation'
          className='button-animation'
          intent={animate ? 'primary' : 'none'}
        />
      </DialogsProvider>
    </div>
  );
}

export const getServerSideProps = withPageTransitionDelay((ctx) => ({
  props: { settings: get(Key.Settings, ctx) },
}));

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
