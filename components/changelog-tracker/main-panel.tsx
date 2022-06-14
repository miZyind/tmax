import clsx from 'classnames';
import { useCallback } from 'react';
import styled from 'styled-components';

import { Classes, Spinner, SpinnerSize, Tree } from '@blueprintjs/core';

import { useChangelogs } from '#api/get-changelogs';
import { useWindowSize } from '#utils/hook';

import ContentPanel from './content-panel';

import type { PanelProps, TreeNodeInfo } from '@blueprintjs/core';

type Props = PanelProps<StyledProps>;
interface NodeData {
  title: string;
  content: string;
}

const TREE_NODE_WIDTH = 160;

function MainPanel({ className, openPanel }: Props) {
  const changelogs = useChangelogs();
  const [windowWidth] = useWindowSize();
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

  if (changelogs && typeof windowWidth !== 'undefined') {
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
      <div
        style={{
          width: Math.min(
            changelogs.length * TREE_NODE_WIDTH,
            windowWidth - (windowWidth % TREE_NODE_WIDTH),
          ),
        }}
        className={className}
      >
        <Tree contents={contents} onNodeClick={onNodeClick} />
      </div>
    );
  }

  return (
    <div className={clsx(className, 'loading')}>
      <Spinner size={SpinnerSize.LARGE} />
    </div>
  );
}

const StyledMainPanel = styled(MainPanel)`
  height: 100%;
  margin: 8px auto auto;
  min-width: ${TREE_NODE_WIDTH}px;
  &.loading {
    margin: unset;
    display: flex;
    justify-content: center;
  }
  .${Classes.TREE_ROOT} {
    display: flex;
    flex-wrap: wrap;
  }
  .${Classes.TREE_NODE}.${Classes.TREE_NODE_EXPANDED} {
    flex: 1;
    cursor: pointer;
    margin-bottom: 8px;
    min-width: ${TREE_NODE_WIDTH}px;
    max-width: ${TREE_NODE_WIDTH}px;
  }
  .${Classes.TREE_NODE_CONTENT} {
    height: 40px;
    padding-left: unset;
  }
  .${Classes.TREE_NODE_CONTENT}-0 {
    &:hover,
    &:active {
      background-color: unset;
    }
  }
  .${Classes.TREE_NODE_LABEL} {
    font-size: 16px;
    line-height: 22px;
  }
`;

export default {
  renderPanel: (props: Props) => <StyledMainPanel {...props} />,
};
