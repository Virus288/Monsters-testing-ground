import React from 'react';
import { Container, ContainerBody } from '../../../../main/components/customs';
import * as animation from '../../../../shared/animation';
import * as hooks from '../../../redux';
import { useMainSelector } from '../../../redux/hooks';
import { LogsBody } from '../themed';
import { generateRaw } from './Renderer';

const RawMessages: React.FC = () => {
  const { messages, logs } = useMainSelector(hooks.socketState);

  return (
    <Container variants={animation.slideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody>
        <LogsBody>{generateRaw(messages, logs)}</LogsBody>
      </ContainerBody>
    </Container>
  );
};

export default RawMessages;
