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
    <div className={className}>
      <div ref={ref} className='loader'>
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
      <div className='canvas-container'>
        <canvas id='singularity' />
      </div>
    </div>
  );
}

export const getServerSideProps = () => ({ props: {} });

export default styled(Singularity)`
  display: flex;
  width: inherit;
  height: inherit;
  align-items: center;
  justify-content: center;
  background-color: #1e1e22;
  .loader {
    top: 0;
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
  }
  .canvas-container {
    width: 100%;
    max-height: 100%;
    aspect-ratio: 16/9;
  }
`;
