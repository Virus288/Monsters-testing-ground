import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { NavigateFunction } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as animation from '../../../../shared/animation';
import { ENotificationType } from '../../../enums';
import * as hooks from '../../../redux';
import { useMainDispatch } from '../../../redux/hooks';
import type { INotification } from '../../../redux/types';
import { navigateUpdate } from '../controllers';
import { DisableNotifications, Notification, UpdateNotification } from '../themed';

const renderNotifications = (
  messages: INotification[],
  navigate: NavigateFunction,
  setNotifications: React.Dispatch<React.SetStateAction<INotification[]>>,
): JSX.Element[] | JSX.Element => {
  let i = 0;
  return messages.map((n) => {
    i++;

    switch (n.type) {
      case ENotificationType.Update:
        return (
          <UpdateNotification
            key={`${n.message}-${i}`}
            $nth={i - 1}
            data-cy="notification-update-body"
            variants={animation.slowSlideDown}
            onClick={(): void => navigateUpdate(navigate, setNotifications)}
            initial="init"
            animate="visible"
            exit="exit"
          >
            <h3>{n.message}</h3>
          </UpdateNotification>
        );
      case ENotificationType.Default:
      default:
        return (
          <Notification
            key={`${n.message}-${i}`}
            $nth={i - 1}
            data-cy="notification-default-body"
            variants={animation.slowSlideDown}
            initial="init"
            animate="visible"
            exit="exit"
          >
            <h3>{n.message}</h3>
          </Notification>
        );
    }
  });
};

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useMainDispatch();
  const { messages } = useSelector(hooks.notificationsState);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    if (messages.length === 0) return;
    setNotifications([...notifications, messages[0]]);
    dispatch(hooks.disableNotification());
  }, [dispatch, messages, notifications]);

  return (
    <AnimatePresence mode="wait">
      {notifications.length > 0 ? (
        <>
          {renderNotifications(notifications, navigate, setNotifications)}
          <DisableNotifications
            variants={animation.slowSlideDown}
            initial="init"
            animate="visible"
            exit="exit"
            data-cy="notification-button-disable"
            onClick={(): void => setNotifications([])}
          >
            <h2>X</h2>
          </DisableNotifications>
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default Notifications;
