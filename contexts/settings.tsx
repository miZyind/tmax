import { createContext, useCallback, useMemo, useState } from 'react';

import type { ReactNode } from 'react';

interface Settings {
  immutable: boolean;
}

interface Context {
  settings: Settings;
  update?: (settings: Settings) => void;
}

const defaultSettings: Settings = { immutable: false };

const SettingsContext = createContext<Context>({ settings: defaultSettings });

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState(defaultSettings);
  const update = useCallback(
    (current: Settings) =>
      setSettings((previous) => ({ ...previous, ...current })),
    [],
  );
  const memo = useMemo(() => ({ settings, update }), [settings, update]);

  return (
    <SettingsContext.Provider value={memo}>{children}</SettingsContext.Provider>
  );
}

export default SettingsContext;
