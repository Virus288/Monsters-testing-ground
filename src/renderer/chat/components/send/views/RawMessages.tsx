import React, { useState } from 'react';
import { Container, ContainerBody, Button, Form, TextArea, Label, Select } from '../../../../main/components/customs';
import * as animation from '../../../../shared/animation';
import * as hooks from '../../../redux';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';
import { sendManual, updateRawMessage } from '../controller';
import { generateAvailableMessages } from './Renderer';

const RawMessages: React.FC = () => {
  const dispatch = useMainDispatch();
  const { status } = useMainSelector(hooks.socketState);
  const { owner } = useMainSelector(hooks.appState);
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <Container variants={animation.slideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody>
        {status ? (
          <Form onSubmit={(e): void => sendManual(e, owner!, dispatch)}>
            <Label>Message</Label>

            <Select id="target" name="target" onChange={(e): void => updateRawMessage(e, setValue)}>
              {generateAvailableMessages()}
            </Select>

            <TextArea
              rows={15}
              placeholder="message"
              id="message"
              name="message"
              value={value}
              onChange={(e): void => setValue(e.target.value)}
              required
            />

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
