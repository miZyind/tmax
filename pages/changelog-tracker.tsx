import 'highlight.js/styles/github-dark-dimmed.css';

import clsx from 'classnames';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button, Classes, H3, PanelStack2 } from '@blueprintjs/core';

import Logo from '#components/changelog-tracker/logo';
import MainPanel from '#components/changelog-tracker/main-panel';
import { TRACKER_DESC, TRACKER_TITLE } from '#utils/constant';

import type { Panel as BPPanel } from '@blueprintjs/core';

type Panel = BPPanel<object>;

const STACK_SLICE_START = 0;
const STACK_SLICE_END = -1;
const STACK_BACKABLE_FACTOR = 1;
const isBackable = (stack: Panel[]) => stack.length > STACK_BACKABLE_FACTOR;

function ChangelogTracker({ className }: StyledProps) {
  const [stack, setStack] = useState<Panel[]>([MainPanel]);
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

  useEffect(() => {
    const updateUnit = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        onClose();
      }
    };

    window.addEventListener('keydown', updateUnit);

    return () => window.removeEventListener('keydown', updateUnit);
  }, [onClose]);

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
      <footer className={clsx({ visible: isBackable(stack) })}>
        <Button large intent='primary' onClick={onClose}>
          Back
        </Button>
      </footer>
    </div>
  );
}

export function getServerSideProps() {
  return { props: {} };
}

export default styled(ChangelogTracker)`
  height: 100%;
  display: flex;
  user-select: none;
  flex-direction: column;
  background-color: #252a31;
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
    opacity: 0;
    display: flex;
    padding: 10px;
    visibility: hidden;
    align-items: center;
    justify-content: center;
    transition-duration: 0.4s;
    transition-timing-function: ease-out;
    transition-property: opacity, visibility;
    &.visible {
      opacity: 1;
      visibility: visible;
    }
    .${Classes.BUTTON} {
      width: 50%;
      max-width: 200px;
    }
  }
`;
