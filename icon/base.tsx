import type { ReactNode } from 'react';

interface Props extends StyledProps {
  size: number;
  color?: string;
  children: ReactNode;
}

export type BaseIconProps = Pick<Props, 'className' | 'color' | 'size'>;

export default function BaseIcon({
  className,
  size,
  color = 'white',
  children,
}: Props) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill={color}
      viewBox='0 0 24 24'
    >
      {children}
    </svg>
  );
}
