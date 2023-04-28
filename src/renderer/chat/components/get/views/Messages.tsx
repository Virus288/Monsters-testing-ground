import React from 'react';
import { Container, ContainerBody } from '../../../../main/components/customs';
import * as animation from '../../../../shared/animation';
import * as hooks from '../../../redux';
import { useMainSelector } from '../../../redux/hooks';
import { LogsBody } from '../themed';
import { generateMessages } from './Renderer';

const Messages: React.FC = () => {
  const { messages } = useMainSelector(hooks.socketState);

  return (
    <Container variants={animation.slideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody>
        <LogsBody>{generateMessages(messages)}</LogsBody>
      </ContainerBody>
    </Container>
  );
};

export default Messages;
