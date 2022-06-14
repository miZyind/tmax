import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  type WindowSize = [] | [number, number];

  const [size, setSize] = useState<WindowSize>([]);

  useEffect(() => {
    const handle = () => setSize([window.innerWidth, window.innerHeight]);

    window.addEventListener('resize', handle);

    handle();

    return () => window.removeEventListener('resize', handle);
  }, []);

  return size;
};
