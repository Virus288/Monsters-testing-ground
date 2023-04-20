import React from 'react';
import * as animation from '../../../animation';
import { Container, ContainerBody } from '../../customs';

const Home: React.FC = () => {
  return (
    <Container variants={animation.slideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody>
        <h2>Home page</h2>
      </ContainerBody>
    </Container>
  );
};

export default Home;
