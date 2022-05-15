import 'highlight.js/styles/github-dark-dimmed.css';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

function Logo({ className }: StyledProps) {
  return (
    <Link href='/'>
      <a className={className}>
        <Image title='logo' src='/mizyind.png' width={100} height={100} />
      </a>
    </Link>
  );
}

export function getServerSideProps() {
  return { props: {} };
}

export default styled(Logo)`
  display: flex;
  margin: 10px 0;
  border-radius: 50%;
  background-color: #fff;
  &:hover {
    filter: brightness(120%);
  }
`;
