import React, { useState, useEffect } from 'react';
import * as animation from '../../../../shared/animation';
import * as hooks from '../../../redux';
import { useMainSelector, useMainDispatch } from '../../../redux/hooks';
import { Container, ContainerBody } from '../../customs';
import { generateAvailableUsers } from './Renderer';

const Socket: React.FC = () => {
  const { tokens } = useMainSelector(hooks.tokensState);
  const { clients } = useMainSelector(hooks.chatState);
  const dispatch = useMainDispatch();
  const [availableUsers, setAvailableUsers] = useState<string[]>([]);

  useEffect(() => {
    const users = tokens.map((e) => {
      return e.target;
    });
    setAvailableUsers(
      users.filter((u) => {
        return !clients.includes(u);
      }),
    );
  }, [clients, tokens]);

  return (
    <Container variants={animation.slideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody $justify="flex-start">
        {availableUsers.length > 0 ? generateAvailableUsers(availableUsers, dispatch) : <h2>No available users</h2>}
      </ContainerBody>
    </Container>
  );
};

export default Socket;
