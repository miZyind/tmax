import 'highlight.js/styles/github-dark-dimmed.css';

import styled from 'styled-components';

import { Classes, Divider, H4 } from '@blueprintjs/core';

import type { PanelProps } from '@blueprintjs/core';

type Props = PanelProps<StyledProps>;

function ManagementPanel({ className }: Props) {
  return (
    <div className={className}>
      <H4>Packages Management</H4>
      <Divider />
    </div>
  );
}

const StyledManagementPanel = styled(ManagementPanel)`
  padding: 16px;
  h4 {
    text-align: center;
  }
  .${Classes.DIVIDER} {
    margin: 20px 0;
  }
`;

export default {
  renderPanel: (props: Props) => <StyledManagementPanel {...props} />,
};
