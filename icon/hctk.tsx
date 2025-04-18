import { Icon } from '@blueprintjs/core';

import type { BaseIconProps } from '#icon/base';

export default function HCTKIcon({ size, color = 'white' }: BaseIconProps) {
  return <Icon icon='prescription' size={size} style={{ color }} />;
}
