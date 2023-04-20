import type React from 'react';
import type { MainDispatch } from '../../store/types';
import * as hooks from '../../redux';
import { ENotificationType } from '../../enums';

export default class Handler {
  private readonly _dispatch: MainDispatch;

  constructor(dispatch: MainDispatch) {
    this._dispatch = dispatch;
  }

  private get dispatch(): MainDispatch {
    return this._dispatch;
  }

  toggleNotification(e: React.FormEvent<HTMLFormElement>, message: string): void {
    e.preventDefault();
    this.dispatch(hooks.addNotification({ message, type: ENotificationType.Default }));
  }

  toggleUpdateNotification(e: React.FormEvent<HTMLFormElement>, message: string): void {
    e.preventDefault();
    this.dispatch(
      hooks.addNotification({
        message,
        type: ENotificationType.Update,
      }),
    );
  }
}
