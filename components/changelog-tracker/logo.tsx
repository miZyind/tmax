import 'highlight.js/styles/github-dark-dimmed.css';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import { LogoPath } from '#utils/constant';

function Logo({ className }: StyledProps) {
  return (
    <Link href='/'>
      <a className={className}>
        <Image width={100} height={100} title='logo' src={LogoPath.Original} />
      </a>
    </Link>
  );
}

export default styled(Logo)`
  display: flex;
  margin: 10px 0;
  border-radius: 50%;
  background-color: white;
  &:hover {
    filter: brightness(120%);
  }
`;
