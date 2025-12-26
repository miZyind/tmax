import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button, Classes, Colors, H3, PanelStack } from '@blueprintjs/core';

import Logo from '#component/changelog-tracker/logo';
import Main from '#component/changelog-tracker/main-panel';
import Management from '#component/changelog-tracker/management-panel';
import { TokenContext } from '#context/token';
import { TRACKER_DESC, TRACKER_TITLE } from '#lib/constant';
import { Key, get } from '#lib/cookie';
import { withPageTransitionDelay } from '#lib/hoc';

import type { NextRouter } from 'next/router';
import type { Panel as BPPanel } from '@blueprintjs/core';

interface Props extends StyledProps {
  token: string | null;
}

type Panel = BPPanel<object>;

const STACK_SLICE_START = 0;
const STACK_SLICE_END = -1;
const STACK_BACKABLE_FACTOR = 1;
const initPanels = ({ query }: NextRouter) =>
  [Main].concat(query.panel === 'management' ? [Management] : []);
const isBackable = (stack: Panel[]) => stack.length > STACK_BACKABLE_FACTOR;
const updateStack =
  (newStack: Panel[] = []) =>
  (stack: Panel[]) =>
    isBackable(stack)
      ? stack.slice(STACK_SLICE_START, STACK_SLICE_END)
      : [...stack, ...newStack];

function ChangelogTracker({ className, token }: Props) {
  const router = useRouter();
  const [stack, setStack] = useState<Panel[]>(initPanels(router));
  const backable = isBackable(stack);
  const onOpen = useCallback((v: Panel) => setStack(updateStack([v])), []);
  const onClose = useCallback(() => setStack(updateStack()), []);
  const onClick = useCallback(() => setStack(updateStack([Management])), []);

  useEffect(() => {
    const updateUnit = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        event.preventDefault();
        // FIXME: BlueprintJS not yet support React 19: setStack(updateStack([Management]));
      }
    };

    window.addEventListener('keypress', updateUnit);

    return () => window.removeEventListener('keypress', updateUnit);
  }, [token]);

  return (
    <div className={className}>
      <Head>
        <title>{TRACKER_TITLE}</title>
        <meta name='description' content={TRACKER_DESC} />
      </Head>
      <header>
        <Logo />
        <H3>{TRACKER_TITLE}</H3>
        <p className={Classes.TEXT_LARGE}>{TRACKER_DESC}</p>
      </header>
      <TokenContext.Provider value={token}>
        <PanelStack
          stack={stack}
          onOpen={onOpen}
          onClose={onClose}
          showPanelHeader={false}
        />
      </TokenContext.Provider>
      <footer>
        <Button
          disabled
          size='large'
          onClick={onClick}
          text={backable ? 'Back' : 'Manage'}
          intent={backable ? 'success' : 'primary'}
          endIcon={<span className='shortcut'>Space</span>}
        />
      </footer>
    </div>
  );
}

export const getServerSideProps = withPageTransitionDelay((ctx) => ({
  props: { token: get(Key.Token, ctx) },
}));

export default styled(ChangelogTracker)`
  height: 100%;
  display: flex;
  user-select: none;
  flex-direction: column;
  background-color: ${Colors.DARK_GRAY2};
  header {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    h3,
    p {
      text-align: center;
    }
  }
  .${Classes.PANEL_STACK} {
    flex: 1;
  }
  footer {
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: center;
  }
  .${Classes.BUTTON} {
    width: 200px;
    position: relative;
  }
  .${Classes.BUTTON_TEXT} {
    margin: unset;
  }
  .shortcut {
    right: 15px;
    opacity: 0.4;
    font-size: 10px;
    border-radius: 2px;
    position: absolute;
    visibility: visible;
    padding: 0.2em 0.4em;
    background-color: black;
    transition-duration: 0.4s;
    transition-timing-function: ease-out;
    transition-property: opacity, visibility;
    ${({ theme }) => theme.queries.tablet} {
      opacity: 0;
      visibility: hidden;
    }
  }
`;
