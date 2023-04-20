import React, { useState } from 'react';
import { InnerSection } from '../../settings/themed';
import { Button, Form, Input, Label } from '../../customs';
import type Handler from '../handler';

// eslint-disable-next-line import/prefer-default-export
export const ToggleNotification: React.FC<{ handler: Handler }> = ({ handler }) => {
  const [text, setText] = useState<string>('');

  return (
    <InnerSection>
      <Form onSubmit={(e): void => handler.toggleNotification(e, text)} data-cy="debug-form-defaultNotification">
        <Label>Toggle notification</Label>
        <Input type="text" placeholder="Text" onChange={(e): void => setText(e.target.value)} required />
        <Button type="submit" className="mainButton">
          Send
        </Button>
      </Form>
    </InnerSection>
  );
};

export const ToggleUpdateNotification: React.FC<{ handler: Handler }> = ({ handler }) => {
  const [text, setText] = useState<string>('');

  return (
    <InnerSection>
      <Form onSubmit={(e): void => handler.toggleUpdateNotification(e, text)} data-cy="debug-form-updateNotification">
        <Label>Toggle update notification</Label>
        <Input type="text" placeholder="Text" onChange={(e): void => setText(e.target.value)} required />
        <Button type="submit" className="mainButton">
          Send
        </Button>
      </Form>
    </InnerSection>
  );
};
