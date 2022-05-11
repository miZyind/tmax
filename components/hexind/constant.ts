const WIDTH_PROP = 15;
const HEIGHT_PROP = 17;

export const INITIAL_UNIT = 0;
export const BEGIN_GAP = 0.15;
export const MIDDLE_GAP = 0.35;
export const FINAL_GAP = 1.2;
export const PADDING = 10;
export const WINDOW_PROP = 0.25;
export const ELEMENT_PROP = WIDTH_PROP / HEIGHT_PROP;
export const SIZE_SCALE_PROP = 3;
export const ICON_SCALE_PROP = 0.2;
export const LOGO_SCALE_PROP = 0.875;
export const SINGULARITY_SCALE_PROP = 2.5;
export const HEXAGON_SET: Record<
  number,
  { x: number; y: number; color: string }
> = {
  1: { x: 0, y: -1, color: 'rgba(20,0,35,0.8)' },
  2: { x: 1, y: -0.5, color: 'rgba(51,153,51,0.8)' },
  3: { x: 1, y: 0.5, color: 'rgba(30,83,151,0.8)' },
  4: { x: 0, y: 1, color: 'rgba(233,84,32,0.8)' },
  5: { x: -1, y: 0.5, color: 'rgba(42,71,94,0.8)' },
  6: { x: -1, y: -0.5, color: 'rgba(24,23,23,0.8)' },
};
