import React from 'react';
import styled from 'styled-components';

import { Classes, Navbar } from '@blueprintjs/core';

import config from '#utils/config';

const Index = ({ className }: StyledProps) => (
  <div className={className}>
    <Navbar className={Classes.DARK} fixedToTop>
      <Navbar.Group>
        <Navbar.Heading>{config.title}</Navbar.Heading>
      </Navbar.Group>
    </Navbar>
  </div>
);

export default styled(Index)``;
