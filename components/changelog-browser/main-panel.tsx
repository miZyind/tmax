import { useCallback } from 'react';
import styled from 'styled-components';

import { Classes, Divider, H3, Tree } from '@blueprintjs/core';

import { useChangelogs } from '#api/get-changelogs';

import ContentPanel from './content-panel';

import type { PanelProps, TreeNodeInfo } from '@blueprintjs/core';

interface NodeData {
  content?: string;
}

const MainPanel = styled(
  ({ className, openPanel }: PanelProps<object> & StyledProps) => {
    const changelogs = useChangelogs();
    const contents: TreeNodeInfo<NodeData>[] =
      changelogs?.map(({ name, releases }) => ({
        id: name,
        hasCaret: true,
        label: name,
        isExpanded: true,
        childNodes: releases.map((release) => ({
          id: release.id,
          icon: 'tag',
          label: release.tag_name,
          nodeData: { content: release.body },
        })),
      })) ?? [];
    const onNodeClick = useCallback(
      ({ nodeData }: TreeNodeInfo<NodeData>) => {
        if (typeof nodeData?.content !== 'undefined') {
          openPanel({
            renderPanel: (props: PanelProps<object>) => (
              <ContentPanel {...props} content={nodeData.content as string} />
            ),
          });
        }
      },
      [openPanel],
    );

    return (
      <div className={className}>
        <H3>{`miZyind's Changelog Browser`}</H3>
        <p className={Classes.TEXT_LARGE}>
          {`miZyind's Changelog Browser is a simple utility that you can use to track the changelogs for npm packages easily.`}
        </p>
        <Divider />
        <Tree contents={contents} onNodeClick={onNodeClick} />
      </div>
    );
  },
)`
  padding: 20px;
  h3,
  p {
    text-align: center;
  }
  .${Classes.DIVIDER} {
    margin: 28px 6px;
  }
  .${Classes.TREE_NODE_LABEL} {
    font-size: 16px;
    line-height: 22px;
  }
  li.${Classes.TREE_NODE} {
    cursor: pointer;
  }
`;

export default {
  renderPanel: (props: PanelProps<object>) => <MainPanel {...props} />,
};
