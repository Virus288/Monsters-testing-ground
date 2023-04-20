import type { PayloadAction } from '@reduxjs/toolkit';
import type { ENotificationType } from '../../enums';

export interface INotification {
  type: ENotificationType;
  message: string;
}

export interface INotificationsState {
  messages: INotification[];
}

export interface INotificationActionBody {
  message: string;
  type: ENotificationType;
}

export type INotificationAction = PayloadAction<INotificationActionBody>;
