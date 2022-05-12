import 'highlight.js/styles/github-dark-dimmed.css';

import styled from 'styled-components';

import { Classes, PanelStack2 } from '@blueprintjs/core';

import MainPanel from '#components/changelog-browser/main-panel';

function ChangelogBrowser({ className }: StyledProps) {
  return (
    <div className={className}>
      <PanelStack2 showPanelHeader={false} initialPanel={MainPanel} />
    </div>
  );
}

export default styled(ChangelogBrowser)`
  height: 100%;
  background-color: #252a31;
  .${Classes.PANEL_STACK2} {
    height: 100%;
  }
  .${Classes.PANEL_STACK2_VIEW} {
    overflow: initial;
  }
`;
