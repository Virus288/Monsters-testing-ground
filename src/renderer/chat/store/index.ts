import { configureStore } from '@reduxjs/toolkit';
import app from '../redux/reducers/app';
import communicator from '../redux/reducers/communicator';
import notifications from '../redux/reducers/notifications';
import socket from '../redux/reducers/socket';
import tokens from '../redux/reducers/tokens';

const mainStore = configureStore({
  reducer: {
    communicator,
    notifications,
    socket,
    tokens,
    app,
  },
});

export default mainStore;
