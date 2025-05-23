import { Icon } from '@blueprintjs/core';

import type { BaseIconProps } from '#icon/base';

export default function ChangelogBrowserIcon({
  size,
  color = 'white',
}: BaseIconProps) {
  return <Icon icon='exchange' size={size} style={{ color }} />;
}
