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

export interface ISocketGetMessage extends HTMLFormElement {
  page: HTMLInputElement;
}

export interface ISocketGetWithDetails extends ISocketGetMessage {
  target: HTMLInputElement;
}

export interface ISocketReadMessage extends HTMLFormElement {
  id: HTMLInputElement;
  user: HTMLInputElement;
}
