import { useRouter } from 'next/router';
import { useCallback } from 'react';
import styled from 'styled-components';

import { Button, Classes, Divider, H4 } from '@blueprintjs/core';

import { useToken } from '#contexts/token';
import GithubIcon from '#icons/github';
import Config from '#utils/config';

import type { PanelProps } from '@blueprintjs/core';

type Props = PanelProps<StyledProps>;

const AUTHORIZE_URL = `${Config.GH_OAUTH_URL}/authorize?client_id=${Config.GH_CLIENT_ID}`;

function ManagementPanel({ className }: Props) {
  const router = useRouter();
  const token = useToken();
  const onSignIn = useCallback(() => router.push(AUTHORIZE_URL), [router]);

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
