import 'highlight.js/styles/github-dark-dimmed.css';

import styled from 'styled-components';

import { Classes, Divider, H1 } from '@blueprintjs/core';

import { decode } from '#lib/markdown-decoder';

import type { PanelProps } from '@blueprintjs/core';

interface Props extends StyledProps {
  title: string;
  content: string;
}

function ContentPanel({ className, title, content }: PanelProps<Props>) {
  return (
    <div className={className}>
      <H1>{title}</H1>
      <Divider />
      <div
        className='markdown-body'
        // eslint-disable-next-line react/no-danger -- Necessary to decode markdown content
        dangerouslySetInnerHTML={decode(content)}
      />
    </div>
  );
}

export default styled(ContentPanel)`
  padding: 16px;
  .${Classes.DIVIDER} {
    margin: 20px 0;
  }
  .markdown-body {
    font-size: 16px;
    line-height: 24px;
    user-select: text;
    *:first-child {
      margin-top: 0;
    }
    code {
      padding: 0.2em 0.4em;
      font-size: 85%;
      border-radius: 6px;
      background-color: rgba(110, 118, 129, 0.4);
    }
  }
`;
