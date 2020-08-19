import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

import { Classes, Navbar } from '@blueprintjs/core';

const Index = ({ className }: StyledProps) => {
  const title = process.env.NEXT_PUBLIC_TITLE;

  return (
    <div className={className}>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>{title}</title>
      </Head>
      <Navbar className={Classes.DARK} fixedToTop>
        <Navbar.Group>
          <Navbar.Heading>{title}</Navbar.Heading>
        </Navbar.Group>
      </Navbar>
    </div>
  );
};

export default styled(Index)``;
