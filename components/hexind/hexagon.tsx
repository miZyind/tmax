import GSAP, { Expo } from 'gsap';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { CookieKey, get } from '#utils/cookie';

import { BEGIN_GAP, FINAL_GAP, HEXAGON_SET, MIDDLE_GAP } from './constant';

import type { TimelineLite } from 'gsap';
import type { MouseEventHandler, ReactNode } from 'react';

interface Props extends StyledProps {
  id: keyof typeof HEXAGON_SET;
  width: number;
  height: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}

function bypassTimeline(target: gsap.TweenTarget, vars: gsap.TweenVars) {
  GSAP.set(target, {
    ...vars,
    rotate: 0,
    opacity: 1,
    filter: 'brightness(100%)',
  });
}

function Hexagon({ className, id, width, height, onClick, children }: Props) {
  const settings = get(CookieKey.Settings);
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
    if (!settings.animate) {
      bypassTimeline(ref.current, getPos());
    } else if (timeline === null) {
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
      bypassTimeline(ref.current, getPos());
    } else if (!timeline.isActive()) {
      timeline.play();
    }
  }, [settings.animate, timeline, getPos]);

  return (
    <div
      ref={ref}
      className={className}
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

export default styled(Hexagon)`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  clip-path: ${({ theme }) => theme.clipPaths.hexagon};
  &:hover {
    filter: brightness(120%) !important;
  }
`;
