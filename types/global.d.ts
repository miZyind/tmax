import type { NextApiRequest, NextApiResponse } from 'next';

declare global {
  type Handler = [
    Omit<NextApiRequest, 'body' | 'query'> & {
      query: Record<string, string>;
      body: unknown;
    },
    NextApiResponse,
  ];
  interface StyledProps {
    className?: string;
  }
}
