import styled from 'styled-components';

import { Button, Card, Classes } from '@blueprintjs/core';

interface Props extends StyledProps {
  onClick: () => void;
}

function Control({ className, onClick }: Props) {
  return (
    <Card className={className}>
      <Button large intent='primary' onClick={onClick}>
        Back
      </Button>
    </Card>
  );
}

export default styled(Control)`
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  padding: 10px;
  position: fixed;
  text-align: center;
  .${Classes.BUTTON} {
    width: 50%;
    max-width: 200px;
  }
`;
