import GSAP, { Expo } from 'gsap';
import { useEffect, useRef, useState } from 'react';

import { BEGIN_GAP, FINAL_GAP, MIDDLE_GAP } from './constant';

import type { MouseEventHandler, ReactNode } from 'react';

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
  const x = ux + ux * px;
  const y = uy + uy * py;

  useEffect(() => {
    if (!fixed && !isActive) {
      GSAP.timeline({ defaults: { filter: 'brightness(0%)' } })
        .fromTo(
          ref.current,
          {
            translateX: x * BEGIN_GAP,
            translateY: y * BEGIN_GAP,
          },
          {
            rotate: 90,
            translateX: x * MIDDLE_GAP,
            translateY: y * MIDDLE_GAP,
            delay: 1,
            duration: 1,
            repeat: 1,
            yoyo: true,
            yoyoEase: Expo.easeOut,
            ease: Expo.easeOut,
          },
        )
        .to(ref.current, {
          translateX: x * FINAL_GAP,
          translateY: y * FINAL_GAP,
          filter: 'brightness(100%)',
          duration: 0.8,
          ease: Expo.easeInOut,
        });

      setIsActive(true);
    }
  }, [fixed, isActive, x, y]);

  return (
    <div
      ref={ref}
      className='hexagon'
      style={{
        width: ux,
        height: uy,
        backgroundColor: color,
        transform: `translate(${x * FINAL_GAP}px,${y * FINAL_GAP}px)`,
        visibility: isActive ? 'visible' : 'hidden',
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
