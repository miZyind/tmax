import { useCallback } from 'react';
import styled from 'styled-components';

import { Classes, Spinner, Tree } from '@blueprintjs/core';

import { useChangelogs } from '#api/get-changelogs';

import ContentPanel from './content-panel';

import type { PanelProps, TreeNodeInfo } from '@blueprintjs/core';

type Props = PanelProps<StyledProps>;
interface NodeData {
  title: string;
  content: string;
}

function MainPanel({ className, openPanel }: Props) {
  const changelogs = useChangelogs();
  const onNodeClick = useCallback(
    ({ nodeData }: TreeNodeInfo<NodeData>) => {
      if (typeof nodeData !== 'undefined') {
        openPanel({
          renderPanel: (props: Props) => (
            <ContentPanel {...props} {...nodeData} />
          ),
        });
      }
    },
    [openPanel],
  );

  if (changelogs) {
    const contents: TreeNodeInfo<NodeData>[] = changelogs.map(
      ({ name, releases }) => ({
        id: name,
        label: name,
        hasCaret: true,
        isExpanded: true,
        childNodes: releases.map((release) => ({
          icon: 'tag',
          id: release.id,
          label: release.tag_name,
          nodeData: {
            title: `${name} ${release.tag_name}`,
            content: release.body,
          },
        })),
      }),
    );

    return (
      <div className={className}>
        <Tree contents={contents} onNodeClick={onNodeClick} />
      </div>
    );
  }

  return <Spinner />;
}

const StyledMainPanel = styled(MainPanel)`
  padding: 16px;
  .${Classes.TREE_ROOT} {
    display: flex;
    column-gap: 20px;
    justify-content: center;
  }
  .${Classes.TREE_NODE} {
    flex: 1;
    cursor: pointer;
    max-width: 150px;
  }
  .${Classes.TREE_NODE_LABEL} {
    font-size: 16px;
    line-height: 22px;
  }
`;

export default {
  renderPanel: (props: Props) => <StyledMainPanel {...props} />,
};
