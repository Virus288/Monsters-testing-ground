import React, { useEffect, useState } from 'react';
import {
  Container,
  ContainerBody,
  Button,
  Form,
  Label,
  Input,
  Inline,
  SelectUserIcon,
  Select,
} from '../../../../main/components/customs';
import * as animation from '../../../../shared/animation';
import * as hooks from '../../../redux';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';
import { sendMessage } from '../controller';
import { generateAvailableUsers } from './Renderer';

const Messages: React.FC = () => {
  const dispatch = useMainDispatch();
  const { owner } = useMainSelector(hooks.appState);
  const { status } = useMainSelector(hooks.socketState);
  const { tokens } = useMainSelector(hooks.tokensState);
  const [users, setUsers] = useState<string[]>([]);
  const [mode, setMode] = useState<boolean>(false);

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
          <Form onSubmit={(e): void => sendMessage(e, owner!, dispatch)}>
            <Label>Message</Label>
            <Input placeholder="message" id="message" name="message" required />

            {mode ? (
              <>
                <Label>To user</Label>
                <Inline>
                  <Input placeholder="to user" id="target" name="target" required />
                  <SelectUserIcon onClick={(): void => setMode(!mode)}>?</SelectUserIcon>
                </Inline>
              </>
            ) : (
              <>
                <Label>To user</Label>
                <Inline>
                  <Select id="target" name="target">
                    {generateAvailableUsers(users)}
                  </Select>
                  <SelectUserIcon onClick={(): void => setMode(!mode)}>?</SelectUserIcon>
                </Inline>
              </>
            )}

            <Button type="submit">Send</Button>
          </Form>
        ) : (
          <h2>Not connected</h2>
        )}
      </ContainerBody>
    </Container>
  );
};

export default Messages;
