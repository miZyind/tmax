import { Key, destroy } from '#utils/cookie';
import fetcher from '#utils/fetcher';

import type { NextApiHandler } from 'next';

export const signOut = () => fetcher('/api/oauth/sign-out');

const handler: NextApiHandler = (_, res) => {
  destroy(Key.Token, { res });
  res.json({});
};

export default handler;
