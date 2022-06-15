import 'highlight.js/styles/github-dark-dimmed.css';

import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button, Classes, Colors, H3, PanelStack2 } from '@blueprintjs/core';

import Logo from '#components/changelog-tracker/logo';
import MainPanel from '#components/changelog-tracker/main-panel';
import ManagementPanel from '#components/changelog-tracker/management-panel';
import { TRACKER_DESC, TRACKER_TITLE } from '#utils/constant';
import { withPageTransitionDelay } from '#utils/hoc';

import type { Panel as BPPanel } from '@blueprintjs/core';

type Panel = BPPanel<object>;

const STACK_SLICE_START = 0;
const STACK_SLICE_END = -1;
const STACK_BACKABLE_FACTOR = 1;
const isBackable = (stack: Panel[]) => stack.length > STACK_BACKABLE_FACTOR;

function ChangelogTracker({ className }: StyledProps) {
  const [stack, setStack] = useState<Panel[]>([MainPanel]);
  const backable = isBackable(stack);
  const onOpen = useCallback<(panel: Panel) => void>(
    (panel) => setStack((state) => [...state, panel]),
    [],
  );
  const onClose = useCallback(
    () =>
      setStack((state) =>
        isBackable(state)
          ? state.slice(STACK_SLICE_START, STACK_SLICE_END)
          : state,
      ),
    [],
  );
  const onClick = useCallback(() => {
    if (backable) {
      onClose();
    } else {
      setStack((state) => [...state, ManagementPanel]);
    }
  }, [backable, onClose]);

  useEffect(() => {
    const updateUnit = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        event.preventDefault();
        onClick();
      }
    };

    window.addEventListener('keypress', updateUnit);

    return () => window.removeEventListener('keypress', updateUnit);
  }, [backable, onClick]);

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
      <PanelStack2
        stack={stack}
        onOpen={onOpen}
        onClose={onClose}
        showPanelHeader={false}
      />
      <footer>
        <Button
          large
          text={backable ? 'Back' : 'Manage'}
          intent={backable ? 'success' : 'primary'}
          onClick={onClick}
          rightIcon={<span className='shortcut'>Space</span>}
        />
      </footer>
    </div>
  );
}

export const getServerSideProps = withPageTransitionDelay();

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
  .${Classes.PANEL_STACK2} {
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
    transition: background-color 0.4s ease-out;
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
