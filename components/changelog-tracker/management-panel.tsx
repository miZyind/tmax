import 'highlight.js/styles/github-dark-dimmed.css';

import { useRouter } from 'next/router';
import { useCallback } from 'react';
import styled from 'styled-components';

import { Button, Classes, Divider, H4 } from '@blueprintjs/core';

import GithubIcon from '#icons/github';
import { Key, get } from '#utils/cookie';

import type { PanelProps } from '@blueprintjs/core';

type Props = PanelProps<StyledProps>;

function ManagementPanel({ className }: Props) {
  const router = useRouter();
  const onSignIn = useCallback(
    () =>
      router.push(
        'https://github.com/login/oauth/authorize?client_id=89586b42f4bb2b598272',
      ),
    [router],
  );
  const token = get(Key.Token);

  return (
    <div className={className}>
      <H4>Packages Management</H4>
      <Divider />
      {typeof token === 'string' ? (
        <div>{token}</div>
      ) : (
        <div className='auth-container'>
          <Button
            large
            intent='primary'
            onClick={onSignIn}
            text='Sign in with GitHub'
            icon={<GithubIcon size={20} />}
          />
        </div>
      )}
    </div>
  );
}

const StyledManagementPanel = styled(ManagementPanel)`
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  h4 {
    text-align: center;
  }
  .${Classes.DIVIDER} {
    margin: 20px 0;
  }
  .auth-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default {
  renderPanel: (props: Props) => <StyledManagementPanel {...props} />,
};
