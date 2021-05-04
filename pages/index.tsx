import { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';

import { Switch } from '@blueprintjs/core';

import HCTKDialog from '#components/hctk-dialog';
import Hexind from '#components/hexind';
import SettingsContext from '#contexts/settings';
import { load } from '#utils/hctk-loader';

import type { FormEvent } from 'react';

interface Props extends StyledProps {
  cedict: Cedict;
}

function Index({ className, cedict }: Props) {
  const { settings, update } = useContext(SettingsContext);
  const [isHCTKOpen, setIsHCTKOpen] = useState(false);
  const handleOnHCTKClick = useCallback(() => setIsHCTKOpen(true), []);
  const handleOnHCTKClose = useCallback(() => setIsHCTKOpen(false), []);
  const handleOnImmutableChange = useCallback(
    (e: FormEvent<HTMLInputElement>) =>
      update?.({ immutable: !e.currentTarget.checked }),
    [update],
  );

  return (
    <div className={className}>
      <Hexind onHCTKClick={handleOnHCTKClick} />
      <HCTKDialog
        cedict={cedict}
        isOpen={isHCTKOpen}
        onClose={handleOnHCTKClose}
      />
      <Switch
        className='switch-animation'
        label='Animation'
        checked={!settings.immutable}
        onChange={handleOnImmutableChange}
      />
    </div>
  );
}

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

  .switch-animation {
    top: 0;
    right: 0;
    margin: 5px 10px;
    position: absolute;
  }
`;
