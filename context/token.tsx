import { createContext, useContext } from 'react';

export const TokenContext = createContext<string | null>(null);
export const useToken = () => useContext(TokenContext);
