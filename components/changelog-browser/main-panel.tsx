import 'highlight.js/styles/github-dark-dimmed.css';

import { useCallback } from 'react';
import styled from 'styled-components';

import { Classes, Tree } from '@blueprintjs/core';

import { useChangelogs } from '#api/get-changelogs';
import { decode } from '#utils/markdown-decoder';

import type { PanelProps, TreeNodeInfo } from '@blueprintjs/core';

interface NodeData {
  title: string;
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
          nodeData: {
            title: `${name} ${release.tag_name}`,
            content: release.body,
          },
        })),
      })) ?? [];
    const onNodeClick = useCallback(
      ({ nodeData }: TreeNodeInfo<NodeData>) => {
        if (nodeData) {
          const { title, content } = nodeData;

          if (typeof content !== 'undefined') {
            openPanel({
              title,
              renderPanel: () => (
                <div
                  className='content'
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={decode(content)}
                />
              ),
            });
          }
        }
      },
      [openPanel],
    );

    return (
      <Tree
        className={className}
        contents={contents}
        onNodeClick={onNodeClick}
      />
    );
  },
)`
  .${Classes.TREE_NODE_CONTENT} {
    height: 40px;
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
  title: 'Changelog Browser',
  renderPanel: (props: PanelProps<object>) => <MainPanel {...props} />,
};
