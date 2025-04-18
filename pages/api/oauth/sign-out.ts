import { destroy } from '#lib/cookie';
import fetcher from '#lib/fetcher';

export const signOut = () => fetcher('/api/oauth/sign-out', { method: 'POST' });

export default async function handler(...[req, res]: Handler) {
  await destroy({ req, res });
  res.json({});
}
