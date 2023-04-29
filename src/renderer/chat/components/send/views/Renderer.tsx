import React, { useState } from 'react';
import { Form, Label, Input, Button, Inline, SelectUserIcon, Select } from '../../../../main/components/customs';
import { EMessageTypes } from '../../../enums';
import * as hooks from '../../../redux';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';
import { getWithDetails, getMessage, getUnread, readMessage, sendMessage } from '../controller';

export const generateAvailableUsers = (users: string[]): JSX.Element[] => {
  return users.map((u) => {
    return (
      <option key={u} value={u}>
        {u}
      </option>
    );
  });
};

export const generateAvailableMessages = (): JSX.Element => {
  return (
    <>
      <option value={EMessageTypes.Get}>Get messages</option>
      <option value={EMessageTypes.GetUnread}>Get unread messages</option>
      <option value={EMessageTypes.GetWithDetails}>Get with details</option>
      <option value={EMessageTypes.Send}>Send message</option>
      <option value={EMessageTypes.Read}>Read message</option>
    </>
  );
};

const Get: React.FC = () => {
  const dispatch = useMainDispatch();
  const { owner } = useMainSelector(hooks.appState);

  return (
    <Form onSubmit={(e): void => getMessage(e, owner!, dispatch)}>
      <Label>Page</Label>
      <Input placeholder="page" id="page" name="page" type="number" required />

      <Button type="submit">Send</Button>
    </Form>
  );
};

const GetUnread: React.FC = () => {
  const dispatch = useMainDispatch();
  const { owner } = useMainSelector(hooks.appState);

  return (
    <Form onSubmit={(e): void => getUnread(e, owner!, dispatch)}>
      <Label>Page</Label>
      <Input placeholder="page" id="page" name="page" type="number" required />

      <Button type="submit">Send</Button>
    </Form>
  );
};

const Send: React.FC<{ users: string[] }> = ({ users }) => {
  const dispatch = useMainDispatch();
  const { owner } = useMainSelector(hooks.appState);
  const [mode, setMode] = useState<boolean>(false);

  return (
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
  );
};

const Read: React.FC = () => {
  const dispatch = useMainDispatch();
  const { owner } = useMainSelector(hooks.appState);

  return (
    <Form onSubmit={(e): void => readMessage(e, owner!, dispatch)}>
      <Label>Receiver</Label>
      <Input placeholder="Receiver" id="user" name="user" type="string" required />

      <Label>Conversation id</Label>
      <Input placeholder="Converstaion id" id="id" name="id" type="string" required />

      <Button type="submit">Send</Button>
    </Form>
  );
};

const GetWithDetails: React.FC = () => {
  const dispatch = useMainDispatch();
  const { owner } = useMainSelector(hooks.appState);

  return (
    <Form onSubmit={(e): void => getWithDetails(e, owner!, dispatch)}>
      <Label>Page</Label>
      <Input placeholder="page" id="page" name="page" type="number" required />

      <Label>Conversation id</Label>
      <Input placeholder="Converstaion id" id="target" name="target" type="string" required />

      <Button type="submit">Send</Button>
    </Form>
  );
};

export const renderSendMessage = (target: EMessageTypes, users: string[]): JSX.Element => {
  switch (target) {
    case EMessageTypes.Send:
      return <Send users={users} />;
    case EMessageTypes.GetWithDetails:
      return <GetWithDetails />;
    case EMessageTypes.Read:
      return <Read />;
    case EMessageTypes.GetUnread:
      return <GetUnread />;
    case EMessageTypes.Get:
    default:
      return <Get />;
  }
};
