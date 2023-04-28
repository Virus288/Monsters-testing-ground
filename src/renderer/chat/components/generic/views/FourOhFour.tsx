import React from 'react';
import { ContainerBody, Container, Header, Button, ButtonLink } from '../../../../main/components/customs';
import * as animation from '../../../../shared/animation';

const FourOhFour: React.FC = () => {
  return (
    <Container variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody>
        <Header>Four oh four</Header>
        <Button data-cy="404-button-home" type="button" className="mainButton">
          <ButtonLink to="/" replace>
            Take me home
          </ButtonLink>
        </Button>
      </ContainerBody>
    </Container>
  );
};

export default FourOhFour;
