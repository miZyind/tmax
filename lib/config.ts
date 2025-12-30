export default {
  GA_ID: String(process.env.NEXT_PUBLIC_GA_ID),
  GH_OAUTH_URL: 'https://github.com/login/oauth',
  GH_API_URL: 'https://api.github.com',
  GH_REDIRECT_URI: process.env.NEXT_PUBLIC_GH_REDIRECT_URI ?? '',
  GH_CLIENT_ID: String(process.env.NEXT_PUBLIC_GH_CLIENT_ID),
  GH_CLIENT_SECRET: String(process.env.GH_CLIENT_SECRET),
  GH_TOKEN: String(process.env.GH_TOKEN),
};
