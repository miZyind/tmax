import GSAP, { Expo } from 'gsap';
import { useCallback, useEffect, useRef, useState } from 'react';

import { BEGIN_GAP, FINAL_GAP, HEXAGON_SET, MIDDLE_GAP } from './constant';

import type { TimelineLite } from 'gsap';
import type { MouseEventHandler, ReactNode } from 'react';

export interface Props {
  id: keyof typeof HEXAGON_SET;
  width: number;
  height: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}

export default function Hexagon(props: Props) {
  const { id, width, height, onClick, children } = props;
  const { x, y, color } = HEXAGON_SET[id];
  const ref = useRef<HTMLDivElement>(null);
  const [timeline, setTimeline] = useState<TimelineLite | null>(null);
  const getPos = useCallback(
    (gap = FINAL_GAP) => ({
      left: width + width * x * gap,
      top: height + height * y * gap,
    }),
    [width, height, x, y],
  );

  useEffect(() => {
    if (timeline === null) {
      GSAP.set(ref.current, { ...getPos(BEGIN_GAP), filter: 'brightness(0%)' });

      setTimeline(
        GSAP.timeline({ defaults: { duration: 1, ease: Expo.easeOut } })
          .to(ref.current, { opacity: 1 })
          .to(ref.current, {
            ...getPos(MIDDLE_GAP),
            rotate: 90,
            repeat: 1,
            yoyo: true,
            yoyoEase: Expo.easeOut,
          })
          .to(ref.current, {
            ...getPos(),
            filter: 'brightness(100%)',
            duration: 0.8,
            ease: Expo.easeInOut,
          })
          .pause(),
      );
    } else if (timeline.isActive() && timeline.parent !== null) {
      timeline.kill();
      GSAP.set(ref.current, {
        ...getPos(),
        rotate: 0,
        opacity: 1,
        filter: 'brightness(100%)',
      });
    } else if (!timeline.isActive()) {
      timeline.play();
    }
  }, [timeline, getPos]);

  return (
    <div
      ref={ref}
      className='hexagon'
      style={{
        width,
        height,
        ...getPos(),
        opacity: 0,
        backgroundColor: color,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
