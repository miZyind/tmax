import clsx from 'classnames';
import { useCallback } from 'react';
import styled from 'styled-components';

import {
  Classes,
  Colors,
  InputGroup,
  ProgressBar,
  Spinner,
  SpinnerSize,
  Tag,
  Tree,
} from '@blueprintjs/core';

import { useChangelogs } from '#api/get-changelogs';
import ContentPanel from '#components/changelog-tracker/content-panel';
import { useToken } from '#contexts/token';
import { useWindowSize } from '#utils/hook';

import type { TreeNodeInfo } from '@blueprintjs/core';
import type { PanelActions } from '@blueprintjs/core/lib/esm/components/panel-stack2/panelTypes';

interface Props extends StyledProps {
  openPanel: PanelActions['openPanel'];
  closePanel: PanelActions['closePanel'];
}
interface NodeData {
  title: string;
  content: string;
}

const TREE_NODE_WIDTH = 185;
const WIDTH_SCALE_FACTOR = 2;
const RATE_LIMIT_THRESHOLD = 0.3;
const COLOR_MAP = { success: Colors.GREEN5, danger: Colors.RED5 };

function MainPanel({ className, openPanel }: Props) {
  const token = useToken();
  const hasToken = token !== null;
  const response = useChangelogs(hasToken);
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

  if (response && typeof windowWidth !== 'undefined') {
    const { changelogs, limit, remaining } = response;
    const intent =
      remaining / limit > RATE_LIMIT_THRESHOLD ? 'success' : 'danger';
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
        className={className}
        style={{
          width: Math.min(
            changelogs.length * TREE_NODE_WIDTH,
            windowWidth - (windowWidth % TREE_NODE_WIDTH),
          ),
        }}
      >
        <div className='rate-limit-indicator'>
          <InputGroup
            disabled
            leftIcon='user'
            intent={intent}
            style={{ color: COLOR_MAP[intent] }}
            rightElement={
              <Tag minimal intent={intent}>{`${remaining} / ${limit}`}</Tag>
            }
            value={`${hasToken ? 'Authorized' : 'Unauthorized'} API Rate Limit`}
          />
          <ProgressBar
            intent={intent}
            animate={false}
            value={limit ? remaining / limit : limit}
          />
        </div>
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
  min-width: ${TREE_NODE_WIDTH * WIDTH_SCALE_FACTOR}px;
  &.loading {
    margin: unset;
    display: flex;
    justify-content: center;
  }
  .rate-limit-indicator {
    min-width: 275px;
    max-width: 635px;
    margin: auto auto 8px auto;
    background-color: ${Colors.DARK_GRAY2};
  }
  .${Classes.INPUT_GROUP} {
    pointer-events: none;
  }
  .${Classes.INPUT} {
    font-size: 14px !important;
    background-color: unset !important;
  }
  .${Classes.PROGRESS_BAR}, .${Classes.PROGRESS_METER} {
    border-radius: unset !important;
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
