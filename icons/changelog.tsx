import { Icon } from '@blueprintjs/core';

import type { BaseIconProps } from '#icons/base';

export default function ChangelogIcon({
  size,
  color = 'white',
}: BaseIconProps) {
  return <Icon icon='exchange' size={size} style={{ color }} />;
}
