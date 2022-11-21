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
    const onStart = () => {
      setLoading(true);
      GSAP.to(ref.current, { ...GSAP_VARS, opacity: 1 });
    };
    const onStop = () =>
      loading && GSAP.to(ref.current, { ...GSAP_VARS, opacity: 0 });

    router.events.on('routeChangeStart', onStart);
    router.events.on('routeChangeComplete', onStop);
    router.events.on('routeChangeError', onStop);

    return () => {
      router.events.off('routeChangeStart', onStart);
      router.events.off('routeChangeComplete', onStop);
      router.events.off('routeChangeError', onStop);
    };
  }, [loading, router]);

  return (
    <div ref={ref} className={className}>
      <Spinner intent='primary' size={unit + SPINNER_SCALE_SIZE} />
      <Image
        alt='logo'
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
