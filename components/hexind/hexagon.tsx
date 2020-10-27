import GSAP, { Expo } from 'gsap';
import { useEffect, useRef, useState } from 'react';

import { BEGIN_GAP_SIZE, FINAL_GAP_SIZE, MIDDLE_GAP_SIZE } from './constant';

import type { MouseEventHandler, ReactNode } from 'react';

function getPos(u: number, p: number, gapSize = FINAL_GAP_SIZE) {
  return u + u * p * gapSize;
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
  const x = getPos(ux, px);
  const y = getPos(uy, py);

  useEffect(() => {
    if (!fixed && !isActive) {
      GSAP.timeline({ defaults: { filter: 'brightness(0%)' } })
        .fromTo(
          ref.current,
          {
            translateX: getPos(ux, px, BEGIN_GAP_SIZE),
            translateY: getPos(uy, py, BEGIN_GAP_SIZE),
          },
          {
            rotate: 90,
            translateX: getPos(ux, px, MIDDLE_GAP_SIZE),
            translateY: getPos(uy, py, MIDDLE_GAP_SIZE),
            delay: 1,
            duration: 1,
            repeat: 1,
            yoyo: true,
            yoyoEase: Expo.easeOut,
            ease: Expo.easeOut,
          },
        )
        .to(ref.current, {
          translateX: x,
          translateY: y,
          filter: 'brightness(100%)',
          duration: 0.8,
          ease: Expo.easeInOut,
        });

      setIsActive(true);
    }
  }, [fixed, isActive, px, py, ux, uy, x, y]);

  return (
    <div
      ref={ref}
      className='hexagon'
      style={{
        width: ux,
        height: uy,
        backgroundColor: color,
        transform: `translate(${x}px, ${y}px)`,
        visibility: isActive ? 'visible' : 'hidden',
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
