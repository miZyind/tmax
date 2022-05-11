import clsx from 'classnames';
import GSAP, { Expo } from 'gsap';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import {
  BEGIN_GAP,
  FINAL_GAP,
  HEXAGON_SET,
  MIDDLE_GAP,
} from '#components/hexind/constant';
import { CookieKey, get } from '#utils/cookie';

import type { MouseEventHandler, ReactNode } from 'react';

interface Props extends StyledProps {
  id: keyof typeof HEXAGON_SET;
  width: number;
  height: number;
  animate: boolean;
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

function Hexagon({
  className,
  id,
  width,
  height,
  animate,
  onClick,
  children,
}: Props) {
  const settings = get(CookieKey.Settings);
  const { x, y, color } = HEXAGON_SET[id];
  const ref = useRef<HTMLDivElement>(null);
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);
  const [playing, setPlaying] = useState(settings.animate && !animate);
  const getPos = useCallback(
    (gap = FINAL_GAP) => ({
      left: width + width * x * gap,
      top: height + height * y * gap,
    }),
    [width, height, x, y],
  );

  useEffect(() => {
    if (!settings.animate || animate) {
      bypassTimeline(ref.current, getPos());
    } else if (timeline === null) {
      GSAP.set(ref.current, { ...getPos(BEGIN_GAP), filter: 'brightness(0%)' });
      setTimeline(
        GSAP.timeline({
          defaults: { duration: 1, ease: Expo.easeOut },
          onComplete: () => setPlaying(false),
        })
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
  }, [settings.animate, animate, timeline, getPos]);

  return (
    <div
      ref={ref}
      className={clsx(className, { playing })}
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
  cursor: pointer;
  position: absolute;
  align-items: center;
  justify-content: center;
  clip-path: ${({ theme }) => theme.paths.hexagon};
  &:hover {
    filter: brightness(120%) !important;
  }
  &.playing {
    cursor: default;
    pointer-events: none;
  }
`;
