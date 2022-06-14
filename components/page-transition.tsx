import GSAP, { Expo } from 'gsap';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Classes, Colors, Spinner } from '@blueprintjs/core';

import { LogoPath } from '#utils/constant';
import { useUnit } from '#utils/hook';

const SPINNER_PROP = 0.8;
const SPINNER_SCALE_SIZE = 20;
const GSAP_VARS = { duration: 1, ease: Expo.easeInOut };

function PageTransition({ className }: StyledProps) {
  const router = useRouter();
  const unit = useUnit() * SPINNER_PROP;
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
      GSAP.to(ref.current, { ...GSAP_VARS, opacity: 1 });
    };
    const handleStop = () =>
      loading && GSAP.to(ref.current, { ...GSAP_VARS, opacity: 0 });

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [loading, router]);

  return (
    <div ref={ref} className={className}>
      <Spinner intent='primary' size={unit + SPINNER_SCALE_SIZE} />
      <Image
        title='logo'
        width={unit}
        height={unit}
        src={LogoPath.Alternate}
        style={{ borderRadius: '50%', backgroundColor: 'white' }}
      />
    </div>
  );
}

export default styled(PageTransition)`
  opacity: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  position: absolute;
  align-items: center;
  pointer-events: none;
  justify-content: center;
  background-color: ${Colors.DARK_GRAY2};
  .${Classes.SPINNER} {
    position: absolute;
  }
`;
