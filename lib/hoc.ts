import type { GetServerSidePropsContext as Context } from 'next';

const PAGE_TRANSITION_DELAY = 1000;

export const withPageTransitionDelay =
  (param?: (ctx: Context) => unknown) => async (ctx: Context) => {
    await new Promise((resolve) => setTimeout(resolve, PAGE_TRANSITION_DELAY));

    return typeof param === 'undefined' ? { props: {} } : param(ctx);
  };
