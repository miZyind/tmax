import GSAP, { Expo } from 'gsap';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { Classes, Spinner } from '@blueprintjs/core';

import init from '#singularity';
import { LogoPath } from '#utils/constant';
import { useUnit } from '#utils/hook';

const LOADING_DELAY = 5000;
const SPINNER_PROP = 0.8;
const SPINNER_SCALE_SIZE = 20;
const GSAP_VARS = { duration: 1, ease: Expo.easeInOut };

function Singularity({ className }: StyledProps) {
  const ref = useRef<HTMLDivElement>(null);
  const unit = useUnit() * SPINNER_PROP;

  useEffect(() => {
    GSAP.to(ref.current, { ...GSAP_VARS, opacity: 1 });
    void init().catch(() => null);
    setTimeout(
      () => GSAP.to(ref.current, { ...GSAP_VARS, opacity: 0 }),
      LOADING_DELAY,
    );
  }, []);

  return (
    <>
      <div ref={ref} className={className}>
        <Spinner size={unit + SPINNER_SCALE_SIZE} />
        <Image
          title='logo'
          width={unit}
          height={unit}
          src={LogoPath.Singularity}
          style={{ borderRadius: '50%' }}
        />
        <div className='text'>Loading game assets...</div>
      </div>
      <canvas id='singularity' />
    </>
  );
}

export const getServerSideProps = () => ({ props: {} });

export default styled(Singularity)`
  opacity: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  position: absolute;
  align-items: center;
  pointer-events: none;
  justify-content: center;
  background-color: #140023;
  .${Classes.SPINNER} {
    position: absolute;
  }
  .${Classes.SPINNER_HEAD} {
    stroke: #2489a9 !important;
  }
  .text {
    bottom: 10%;
    font-size: 16px;
    color: #eecf8c;
    position: absolute;
    font-family: Endor, sans-serif;
  }
`;
