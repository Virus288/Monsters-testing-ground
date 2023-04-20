import React from 'react';
import * as animation from '../../../animation';
import { Container, ContainerBody, Header } from '../../customs';
import * as icons from '../../customs/icons';

const Loading: React.FC<{ finished: boolean }> = ({ finished }) => {
  return (
    <Container variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody>
        {finished ? (
          <Header>Loaded</Header>
        ) : (
          <>
            <Header>Loading</Header>
            <icons.LoadingPill />
          </>
        )}
      </ContainerBody>
    </Container>
  );
};

export default Loading;
