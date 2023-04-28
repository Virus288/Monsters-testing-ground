import React from 'react';
import { Container, ContainerBody, Button, Form, TextArea, Label } from '../../../../main/components/customs';
import * as animation from '../../../../shared/animation';
import * as hooks from '../../../redux';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';
import { sendManual } from '../controller';

const RawMessages: React.FC = () => {
  const dispatch = useMainDispatch();
  const { status } = useMainSelector(hooks.socketState);
  const { owner } = useMainSelector(hooks.appState);

  return (
    <Container variants={animation.slideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody>
        {status ? (
          <Form onSubmit={(e): void => sendManual(e, owner!, dispatch)}>
            <Label>Message</Label>
            <TextArea rows={15} placeholder="message" id="message" name="message" required />
            <Button type="submit">Send</Button>
          </Form>
        ) : (
          <h2>Not connected</h2>
        )}
      </ContainerBody>
    </Container>
  );
};

export default RawMessages;
