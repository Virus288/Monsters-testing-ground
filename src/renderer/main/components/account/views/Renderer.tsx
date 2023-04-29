import React, { useEffect, useState } from 'react';
import { EResponse, EResponseSubTarget } from '../../../../../enums';
import * as animation from '../../../../shared/animation';
import * as hooks from '../../../redux';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';
import type { MainDispatch } from '../../../store/types';
import { handleResponseError, handleResponseSuccess } from '../../../utils';
import {
  AlreadyLoggedInIcon,
  Button,
  ContainerBody,
  EmailIcon,
  Error,
  ExitButton,
  Form,
  Inline,
  Input,
  Label,
  LoginIcon,
  OverlayContainer,
  PasswordIcon,
  Success,
} from '../../customs';
import { Section } from '../../settings/themed';
import { login, register, removeUser } from '../controller';
import { UserCard, UserPicture } from '../themed';

export const Login: React.FC<{
  setSuccess: React.Dispatch<React.SetStateAction<string | null>>;
  setErr: React.Dispatch<React.SetStateAction<string | null>>;
  setType: React.Dispatch<React.SetStateAction<EResponse>>;
  users: string[];
}> = ({ setSuccess, setErr, setType, users }) => {
  const dispatch = useMainDispatch();
  const [username, setUsername] = useState<string | undefined>(undefined);

  return (
    <>
      <Form onSubmit={(e): void => login(e, dispatch, setErr, setSuccess)}>
        <Label>Login</Label>
        <Inline>
          <Input
            type="text"
            placeholder="Login"
            name="login"
            id="login"
            onChange={(e): void => setUsername(e.target.value)}
            required
          />
          <LoginIcon>?</LoginIcon>
          {users.length > 0 && users.includes(username!) ? <AlreadyLoggedInIcon>?</AlreadyLoggedInIcon> : null}
        </Inline>

        <Label>Password</Label>
        <Inline>
          <Input type="text" placeholder="Password" name="password" id="password" required />
          <PasswordIcon>?</PasswordIcon>
        </Inline>

        <Button type="submit">Send</Button>
      </Form>

      <Button type="button" onClick={(): void => setType(EResponse.Register)}>
        Register
      </Button>
    </>
  );
};

export const Register: React.FC<{
  setSuccess: React.Dispatch<React.SetStateAction<string | null>>;
  setErr: React.Dispatch<React.SetStateAction<string | null>>;
  setType: React.Dispatch<React.SetStateAction<EResponse>>;
  users: string[];
}> = ({ setSuccess, setErr, setType, users }) => {
  const dispatch = useMainDispatch();
  const [username, setUsername] = useState<string | undefined>(undefined);

  return (
    <>
      <Form onSubmit={(e): void => register(e, dispatch, setErr, setSuccess)}>
        <Label>Email</Label>
        <Inline>
          <Input type="text" placeholder="Email" name="email" id="email" required />
          <EmailIcon>?</EmailIcon>
        </Inline>

        <Label>Login</Label>
        <Inline>
          <Input
            type="text"
            placeholder="Login"
            name="login"
            id="login"
            onChange={(e): void => setUsername(e.target.value)}
            required
          />
          <LoginIcon>?</LoginIcon>
          {users.length > 0 && users.includes(username!) ? <AlreadyLoggedInIcon>?</AlreadyLoggedInIcon> : null}
        </Inline>

        <Label>Password</Label>
        <Inline>
          <Input type="text" placeholder="Password" name="password" id="password" required />
          <PasswordIcon>?</PasswordIcon>
        </Inline>

        <Button type="submit">Send</Button>
      </Form>

      <Button type="button" onClick={(): void => setType(EResponse.Login)}>
        Login
      </Button>
    </>
  );
};

export const AddAccount: React.FC<{
  users: string[];
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ users, setAdd }) => {
  const dispatch = useMainDispatch();
  const { data } = useMainSelector(hooks.responsesState);
  const [type, setType] = useState<EResponse.Login | EResponse.Register>(EResponse.Login);

  const [err, setErr] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const response = data.find((e) => {
      return e.target === type;
    });
    if (response) {
      switch (response.payload.subTarget) {
        case EResponseSubTarget.Error:
          handleResponseError(response, dispatch, setErr, type);
          break;
        case EResponseSubTarget.Response:
          handleResponseSuccess(type === EResponse.Login ? 'Logged in' : 'Created account', dispatch, setSuccess, type);
          break;
        default:
          break;
      }
    }
  }, [data, data.length, dispatch, type]);

  useEffect(() => {
    setErr(null);
    setSuccess(null);
  }, [type]);

  return (
    <OverlayContainer variants={animation.slideRight} initial="init" animate="visible" exit="exit">
      <ExitButton onClick={(): void => setAdd(false)} data-cy="settings-button-exit">
        <i className="icon-left-open-outline navIcon" />
      </ExitButton>
      <ContainerBody>
        <Section>{err ? <Error>{err}</Error> : null}</Section>
        <Section>{success ? <Success>{success}</Success> : null}</Section>

        <Section>
          {type === EResponse.Login ? (
            <Login setErr={setErr} setSuccess={setSuccess} setType={setType} users={users} />
          ) : (
            <Register setSuccess={setSuccess} setErr={setErr} setType={setType} users={users} />
          )}
        </Section>
      </ContainerBody>
    </OverlayContainer>
  );
};

export const renderUsers = (users: string[], dispatch: MainDispatch): JSX.Element[] => {
  return users.map((e) => {
    return (
      <UserCard key={e}>
        <UserPicture> </UserPicture>
        <h3>{e}</h3>
        <Button onClick={(): void => removeUser(e, dispatch)}>Remove</Button>
      </UserCard>
    );
  });
};
