import GSAP, { Expo } from 'gsap';
import React, { ReactNode, useEffect, useRef } from 'react';

import { BEGIN_GAP_SIZE, FINAL_GAP_SIZE } from './constant';

interface Props {
  ux: number;
  uy: number;
  px: number;
  py: number;
  color: string;
  scalable?: boolean;
  children?: ReactNode;
}

export default function Hexagon({
  ux,
  uy,
  px,
  py,
  color,
  scalable = false,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const gapSize = scalable ? BEGIN_GAP_SIZE : FINAL_GAP_SIZE;
  const x = ux + ux * px * gapSize;
  const y = uy + uy * py * gapSize;

  if (scalable) {
    useEffect(() => {
      GSAP.to(ref.current, {
        translateX: ux + ux * px * FINAL_GAP_SIZE,
        translateY: uy + uy * py * FINAL_GAP_SIZE,
        duration: 1.5,
        ease: Expo.easeInOut,
      });
    }, [ux, uy]);
  }

  return (
    <div
      ref={ref}
      className='hexagon'
      style={{
        backgroundColor: color,
        width: ux,
        height: uy,
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      {children}
    </div>
  );
}
