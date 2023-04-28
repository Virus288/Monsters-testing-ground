import React, { useState } from 'react';
import { EResponse } from '../../../../../enums';
import { useMainDispatch } from '../../../redux/hooks';
import {
  Button,
  Form,
  Input,
  Label,
  Inline,
  LoginIcon,
  AlreadyLoggedInIcon,
  PasswordIcon,
  EmailIcon,
} from '../../customs';
import { login, register } from '../controller';

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
