import type React from 'react';
import type { NavigateFunction } from 'react-router-dom';
import type { INotification } from '../../redux/types';

// eslint-disable-next-line import/prefer-default-export
export const navigateUpdate = (
  navigate: NavigateFunction,
  setNotifications: React.Dispatch<React.SetStateAction<INotification[]>>,
): void => {
  setNotifications([]);
  navigate('/update');
};
