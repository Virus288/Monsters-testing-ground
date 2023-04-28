export interface ILoginForm extends HTMLFormElement {
  login: HTMLInputElement;
  password: HTMLInputElement;
}

export interface IRegisterForm extends HTMLFormElement {
  email: HTMLInputElement;
  login: HTMLInputElement;
  password: HTMLInputElement;
}

export interface ISocketConnectionForm extends HTMLFormElement {
  user: HTMLInputElement;
}

export interface ISendSocketManualMessage extends HTMLFormElement {
  message: HTMLInputElement;
  target: HTMLInputElement;
}
