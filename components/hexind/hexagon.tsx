import GSAP, { Expo } from 'gsap';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

import { BEGIN_GAP_SIZE, FINAL_GAP_SIZE, MIDDLE_GAP_SIZE } from './constant';

interface Props {
  ux: number;
  uy: number;
  px: number;
  py: number;
  color: string;
  fixed?: boolean;
  children: ReactNode;
}

export default function Hexagon(props: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { ux, uy, px, py, fixed = false } = props;
  const [hasPrepared, setHasPrepared] = useState(fixed);
  const x = ux + ux * px * FINAL_GAP_SIZE;
  const y = uy + uy * py * FINAL_GAP_SIZE;

  if (!fixed) {
    useEffect(() => {
      GSAP.set(ref.current, {
        filter: `brightness(${hasPrepared ? '100' : '0'}%)`,
        translateX: hasPrepared ? x : ux + ux * px * BEGIN_GAP_SIZE,
        translateY: hasPrepared ? y : uy + uy * py * BEGIN_GAP_SIZE,
      });

      const timeline = GSAP.timeline({ defaults: { ease: Expo.easeInOut } })
        .to(ref.current, {
          delay: 1,
          repeat: 1,
          yoyo: true,
          duration: 0.5,
          rotate: 90,
          translateX: ux + ux * px * MIDDLE_GAP_SIZE,
          translateY: uy + uy * py * MIDDLE_GAP_SIZE,
        })
        .to(ref.current, {
          duration: 1,
          filter: 'brightness(100%)',
          translateX: x,
          translateY: y,
        })
        .pause();

      if (!hasPrepared) {
        timeline.play();
        setHasPrepared(true);
      }

      return () => {
        timeline.kill();
      };
    }, [ux, uy]);
  }

  return (
    <div
      ref={ref}
      className='hexagon'
      style={{
        width: ux,
        height: uy,
        backgroundColor: props.color,
        transform: `translate(${x}px, ${y}px)`,
        visibility: hasPrepared ? 'visible' : 'hidden',
      }}
    >
      {props.children}
    </div>
  );
}