import React, { useEffect } from 'react';
import { EResponseCallback } from '../../../../../enums';
import Controller from '../../../communication';
import * as hooks from '../../../redux';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';

const Communicator: React.FC = () => {
  const dispatch = useMainDispatch();

  const controller = React.useMemo(() => {
    return new Controller(dispatch);
  }, [dispatch]);
  const messages = useMainSelector(hooks.communicatorState);

  useEffect(() => {
    const target = messages.messages[0];
    if (!target) return;

    switch (target.type) {
      case EResponseCallback.Version:
        controller.sendUpdateMessage({
          target: target.target,
          payload: undefined,
          type: EResponseCallback.Data,
        });
        break;
      case EResponseCallback.Window:
        controller.sendWindowMessage({
          target: target.target,
          payload: target.message,
          type: EResponseCallback.Data,
        });
        break;
      default:
        controller.sendMessage({
          target: target.target,
          payload: target.message,
          type: target.type,
        });
        break;
    }

    dispatch(hooks.clearMessage({ target: target.counter }));
  }, [messages, dispatch, controller]);

  useEffect(() => {
    controller.listen();
  }, [controller]);

  return null;
};

export default Communicator;
