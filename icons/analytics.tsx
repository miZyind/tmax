import { Icon } from '@blueprintjs/core';

import type { BaseIconProps } from './base';

export default function AnalyticsIcon({
  size,
  color = 'white',
}: BaseIconProps) {
  return <Icon icon='series-search' size={size} style={{ color }} />;
}