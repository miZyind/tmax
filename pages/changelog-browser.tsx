import 'highlight.js/styles/github-dark-dimmed.css';

import styled from 'styled-components';

import { Classes, PanelStack2 } from '@blueprintjs/core';

import MainPanel from '#components/changelog-browser/main-panel';

function ChangelogBrowser({ className }: StyledProps) {
  return (
    <div className={className}>
      <PanelStack2 initialPanel={MainPanel} />
    </div>
  );
}

export default styled(ChangelogBrowser)`
  height: 100%;
  background-color: #252a31;
  .${Classes.PANEL_STACK2} {
    height: 100%;
    .content {
      padding: 10px;
      code {
        color: #c7254e;
        font-size: 90%;
        padding: 2px 4px;
        border-radius: 4px;
        background-color: #f9f2f4;
      }
    }
  }
`;
