import GSAP, { Expo } from 'gsap';
import React, {
  HTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { BEGIN_GAP_SIZE, FINAL_GAP_SIZE, MIDDLE_GAP_SIZE } from './constant';

export interface Props {
  ux: number;
  uy: number;
  px: number;
  py: number;
  color: string;
  fixed?: boolean;
  onClick?: HTMLAttributes<HTMLDivElement>['onClick'];
  children: ReactNode;
}

export default function Hexagon(props: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { ux, uy, px, py, fixed = false, onClick } = props;
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

      const timeline = GSAP.timeline()
        .to(ref.current, {
          rotate: 90,
          translateX: ux + ux * px * MIDDLE_GAP_SIZE,
          translateY: uy + uy * py * MIDDLE_GAP_SIZE,
          delay: 1,
          duration: 1,
          repeat: 1,
          yoyo: true,
          yoyoEase: Expo.easeOut,
          ease: Expo.easeOut,
        })
        .to(ref.current, {
          translateX: x,
          translateY: y,
          filter: 'brightness(100%)',
          duration: 0.8,
          ease: Expo.easeInOut,
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
      onClick={onClick}
    >
      {props.children}
    </div>
  );
}
