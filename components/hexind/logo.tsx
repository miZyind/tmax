import styled from 'styled-components';

import { LOGO_SCALE_PROP } from './constant';

export interface Props extends StyledProps {
  width: number;
  height: number;
}

function Logo({ className, width, height }: Props) {
  const imageSize = width * LOGO_SCALE_PROP;

  return (
    <div
      className={className}
      style={{ width, height, left: width, top: height }}
    >
      <div style={{ width: imageSize, height: imageSize }} />
    </div>
  );
}

export default styled(Logo)`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: white;
  clip-path: ${({ theme }) => theme.clipPaths.hexagon};

  > div {
    border-radius: 50%;
    background-size: cover;
    background-image: url('/mizyind.png');
  }
`;
