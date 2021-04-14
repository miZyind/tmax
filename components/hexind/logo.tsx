import clsx from 'classnames';
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
      className={clsx(className, 'hexagon')}
      style={{ width, height, left: width, top: height }}
    >
      <div style={{ width: imageSize, height: imageSize }} />
    </div>
  );
}

export default styled(Logo)`
  background-color: white;

  > div {
    border-radius: 50%;
    background-size: cover;
    background-image: url('/mizyind.png');
  }
`;
