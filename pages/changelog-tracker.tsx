import 'highlight.js/styles/github-dark-dimmed.css';

import Head from 'next/head';
import styled from 'styled-components';

import { Classes, PanelStack2 } from '@blueprintjs/core';

import MainPanel from '#components/changelog-tracker/main-panel';
import { TRACKER_DESC, TRACKER_TITLE } from '#utils/constant';

function ChangelogTracker({ className }: StyledProps) {
  return (
    <div className={className}>
      <Head>
        <title>{TRACKER_TITLE}</title>
        <meta name='description' content={TRACKER_DESC} />
      </Head>
      <PanelStack2 showPanelHeader={false} initialPanel={MainPanel} />
    </div>
  );
}

export function getServerSideProps() {
  return { props: {} };
}

export default styled(ChangelogTracker)`
  height: 100%;
  background-color: #252a31;
  .${Classes.PANEL_STACK2} {
    height: 100%;
  }
  .${Classes.PANEL_STACK2_VIEW} {
    overflow: initial;
  }
`;
