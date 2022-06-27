import { useRouter } from 'next/router';
import { useCallback } from 'react';
import styled from 'styled-components';

import { Button, Classes, Divider, H4 } from '@blueprintjs/core';

import { signOut } from '#api/oauth/sign-out';
import { useToken } from '#contexts/token';
import GithubIcon from '#icons/github';
import Config from '#utils/config';

import type { PanelProps } from '@blueprintjs/core';

type Props = PanelProps<StyledProps>;

const { GH_OAUTH_URL, GH_CLIENT_ID, GH_REDIRECT_URI } = Config;
const AUTH_URL = `${GH_OAUTH_URL}/authorize?client_id=${GH_CLIENT_ID}&redirect_uri=${GH_REDIRECT_URI}`;

function ManagementPanel({ className }: Props) {
  const router = useRouter();
  const token = useToken();
  const onSignIn = useCallback(() => router.push(AUTH_URL), [router]);
  const onSignOut = useCallback(async () => {
    await signOut();
    await router.replace('/changelog-tracker?panel=management');
  }, [router]);

  return (
    <div className={className}>
      <H4>Packages Management</H4>
      <Divider />
      {token === null ? (
        <div className='auth-container'>
          <Button
            large
            intent='primary'
            onClick={onSignIn}
            text='Sign in with GitHub'
            icon={<GithubIcon size={20} />}
          />
        </div>
      ) : (
        <div className='auth-container'>
          <Button
            large
            icon='log-out'
            text='Sign out'
            intent='primary'
            onClick={onSignOut}
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
