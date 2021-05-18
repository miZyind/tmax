import { createContext, useMemo, useReducer } from 'react';

import type { Dispatch, ReactNode } from 'react';

export enum Name {
  Analytics = 0,
  HCTK = 1,
}

type State = Record<Name, boolean>;
type Action = [Name, boolean];

interface Context {
  state: State;
  dispatch: Dispatch<Action>;
}

const initialState = Object.fromEntries(
  Object.values(Name).map((dialog) => [dialog, false]),
) as State;
const reducer = (state: State, [n, v]: Action) => ({ ...state, [n]: v });

export const DialogsContext = createContext({} as Context);

export function DialogsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const memo = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <DialogsContext.Provider value={memo}>{children}</DialogsContext.Provider>
  );
}
