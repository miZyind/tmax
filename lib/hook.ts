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
export const useUnit = () => {
  const INITIAL_UNIT = 0;
  const PADDING = 10;
  const WINDOW_PROP = 0.25;
  const [windowWidth, windowHeight] = useWindowSize();

  if (typeof windowWidth === 'number' && typeof windowHeight === 'number') {
    return (Math.min(windowWidth, windowHeight) - PADDING) * WINDOW_PROP;
  }

  return INITIAL_UNIT;
};
