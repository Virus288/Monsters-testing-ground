import React from 'react';
import { EResponse } from '../../../../enums';
import { useMainDispatch } from '../../../redux/hooks';
import { Button, Form, Input, Label } from '../../customs';
import { login, register } from '../controller';

export const Login: React.FC<{
  setSuccess: React.Dispatch<React.SetStateAction<string | null>>;
  setErr: React.Dispatch<React.SetStateAction<string | null>>;
  setType: React.Dispatch<React.SetStateAction<EResponse>>;
}> = ({ setSuccess, setErr, setType }) => {
  const dispatch = useMainDispatch();

  return (
    <>
      <Form onSubmit={(e): void => login(e, dispatch, setErr, setSuccess)}>
        <Label>Login</Label>
        <Input type="text" placeholder="Login" name="login" id="login" required />

        <Label>Password</Label>
        <Input type="text" placeholder="Password" name="password" id="password" required />

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
}> = ({ setSuccess, setErr, setType }) => {
  const dispatch = useMainDispatch();

  return (
    <>
      <Form onSubmit={(e): void => register(e, dispatch, setErr, setSuccess)}>
        <Label>Email</Label>
        <Input type="text" placeholder="Email" name="email" id="email" required />

        <Label>Login</Label>
        <Input type="text" placeholder="Login" name="login" id="login" required />

        <Label>Password</Label>
        <Input type="text" placeholder="Password" name="password" id="password" required />

        <Button type="submit">Send</Button>
      </Form>

      <Button type="button" onClick={(): void => setType(EResponse.Login)}>
        Login
      </Button>
    </>
  );
};
