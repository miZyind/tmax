import GSAP, { Expo } from 'gsap';
import { useEffect, useRef, useState } from 'react';

import { BEGIN_GAP, FINAL_GAP, MIDDLE_GAP } from './constant';

import type { MouseEventHandler, ReactNode } from 'react';

function calc(u: number, p: number, gap = FINAL_GAP) {
  return u + u * p * gap;
}

export interface Props {
  ux: number;
  uy: number;
  px: number;
  py: number;
  color: string;
  fixed?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}

export default function Hexagon(props: Props) {
  const { ux, uy, px, py, color, fixed = false, onClick, children } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(fixed);

  useEffect(() => {
    if (!fixed && !isActive) {
      GSAP.timeline({ defaults: { filter: 'brightness(0%)' } })
        .fromTo(
          ref.current,
          {
            translateX: calc(ux, px, BEGIN_GAP),
            translateY: calc(uy, py, BEGIN_GAP),
          },
          {
            rotate: 90,
            translateX: calc(ux, px, MIDDLE_GAP),
            translateY: calc(uy, py, MIDDLE_GAP),
            delay: 1,
            duration: 1,
            repeat: 1,
            yoyo: true,
            yoyoEase: Expo.easeOut,
            ease: Expo.easeOut,
          },
        )
        .to(ref.current, {
          translateX: calc(ux, px),
          translateY: calc(uy, py),
          filter: 'brightness(100%)',
          duration: 0.8,
          ease: Expo.easeInOut,
        });

      setIsActive(true);
    }
  }, [fixed, isActive, ux, px, uy, py]);

  return (
    <div
      ref={ref}
      className='hexagon'
      style={{
        width: ux,
        height: uy,
        backgroundColor: color,
        transform: `translate(${calc(ux, px)}px,${calc(uy, py)}px)`,
        visibility: isActive ? 'visible' : 'hidden',
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
