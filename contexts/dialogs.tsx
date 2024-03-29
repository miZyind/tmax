import { useRouter } from 'next/router';
import { createContext, useContext, useMemo, useReducer } from 'react';

import type { Dispatch, ReactNode } from 'react';

export enum Name {
  Analytics = 'ANALYTICS',
  HCTK = 'HCTK',
}

type State = Record<Name, boolean>;
type Action = [Name, boolean];

interface Context {
  state: State;
  dispatch: Dispatch<Action>;
}

const dialogs = Object.values(Name);
const initialState = Object.fromEntries(dialogs.map((name) => [name, false]));
const reducer = (state: State, [n, v]: Action) => ({ ...state, [n]: v });
const DialogsContext = createContext({} as Context);

export const useDialogs = () => useContext(DialogsContext);
export function DialogsProvider({ children }: { children: ReactNode }) {
  const { query } = useRouter();
  const routerState =
    typeof query.dialog === 'string' &&
    dialogs.includes(query.dialog.toUpperCase() as Name)
      ? { [query.dialog.toUpperCase()]: true }
      : {};
  const [state, dispatch] = useReducer(reducer, {
    ...(initialState as State),
    ...routerState,
  });
  const memo = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <DialogsContext.Provider value={memo}>{children}</DialogsContext.Provider>
  );
}
