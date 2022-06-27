import Config from '#utils/config';
import { Key, set } from '#utils/cookie';

import type { NextApiHandler } from 'next';

const LOGIN_URL = `${Config.GH_OAUTH_URL}/access_token`;
const REDIRECT_URL = '/changelog-tracker?panel=management';

const handler: NextApiHandler = async (req, res) => {
  if (typeof req.query.code === 'string') {
    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: Config.GH_CLIENT_ID,
        client_secret: Config.GH_CLIENT_SECRET,
        code: req.query.code,
        redirect_uri: Config.GH_REDIRECT_URI,
      }),
    });

    if (response.ok) {
      const data = (await response.json()) as { access_token: string };

      set(Key.Token, data.access_token, { res });
    }
  }

  res.redirect(REDIRECT_URL);
};

export default handler;
