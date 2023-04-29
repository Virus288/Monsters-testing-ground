import React, { useEffect, useState } from 'react';
import { Container, ContainerBody, Select } from '../../../../main/components/customs';
import * as animation from '../../../../shared/animation';
import { EMessageTypes } from '../../../enums';
import * as hooks from '../../../redux';
import { useMainSelector } from '../../../redux/hooks';
import { renderSendMessage } from './Renderer';

const Messages: React.FC = () => {
  const { status } = useMainSelector(hooks.socketState);
  const { tokens } = useMainSelector(hooks.tokensState);
  const [users, setUsers] = useState<string[]>([]);
  const [target, setTarget] = useState<EMessageTypes>(EMessageTypes.Get);

  useEffect(() => {
    setUsers(
      tokens.map((e) => {
        return e.target;
      }),
    );
  }, [tokens]);

  return (
    <Container variants={animation.slideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody>
        {status ? (
          <>
            <Select onChange={(e): void => setTarget(e.target.value as EMessageTypes)}>
              <option value={EMessageTypes.Get}>Get messages</option>
              <option value={EMessageTypes.GetUnread}>Get unread messages</option>
              <option value={EMessageTypes.GetWithDetails}>Get with details</option>
              <option value={EMessageTypes.Send}>Send message</option>
              <option value={EMessageTypes.Read}>Read message</option>
            </Select>
            {renderSendMessage(target, users)}
          </>
        ) : (
          <h2>Not connected</h2>
        )}
      </ContainerBody>
    </Container>
  );
};

export default Messages;
