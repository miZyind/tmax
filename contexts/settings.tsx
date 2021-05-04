import { createContext, useMemo, useState } from 'react';

import { CookieKey, getCookie, setClientCookie } from '#utils/cookie';

import type { ReactNode } from 'react';

interface Settings {
  animate: boolean;
}

interface Context {
  settings: Settings;
  update?: (settings: Settings) => void;
}

const defaultSettings: Settings = getCookie(CookieKey.Settings) ?? {
  animate: true,
};

const SettingsContext = createContext<Context>({ settings: defaultSettings });

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState(defaultSettings);
  const memo = useMemo(
    () => ({
      settings,
      update: (current: Settings) => {
        setSettings((previous) => {
          const merged = { ...previous, ...current };

          setClientCookie(CookieKey.Settings, merged);

          return merged;
        });
      },
    }),
    [settings],
  );

  return (
    <SettingsContext.Provider value={memo}>{children}</SettingsContext.Provider>
  );
}

export default SettingsContext;
