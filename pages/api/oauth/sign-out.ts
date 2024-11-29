import { destroy } from '#utils/cookie';
import fetcher from '#utils/fetcher';

import type { NextApiHandler } from 'next';

export const signOut = () => fetcher('/api/oauth/sign-out', { method: 'POST' });

const handler: NextApiHandler = async (req, res) => {
  await destroy({ req, res });
  res.json({});
};

export default handler;
