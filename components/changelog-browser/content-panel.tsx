import 'highlight.js/styles/github-dark-dimmed.css';

import { useEffect } from 'react';
import styled from 'styled-components';

import { decode } from '#utils/markdown-decoder';

import Control from './control';

import type { PanelProps } from '@blueprintjs/core';

interface Props {
  content: string;
}

function ContentPanel({
  className,
  content,
  closePanel,
}: PanelProps<Props> & StyledProps) {
  useEffect(() => {
    const updateUnit = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        closePanel();
      }
    };

    window.addEventListener('keydown', updateUnit);

    return () => window.removeEventListener('keydown', updateUnit);
  }, [closePanel]);

  return (
    <>
      <div
        className={className}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={decode(content)}
      />
      <Control onClick={closePanel} />
    </>
  );
}

export default styled(ContentPanel)`
  padding: 20px;
  overflow-y: auto;
  height: calc(100% - 60px);
  code {
    color: #c7254e;
    font-size: 90%;
    padding: 2px 4px;
    border-radius: 4px;
    background-color: #f9f2f4;
  }
`;
