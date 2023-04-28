import { configureStore } from '@reduxjs/toolkit';
import app from '../redux/reducers/app';
import chat from '../redux/reducers/chat';
import communicator from '../redux/reducers/communicator';
import notifications from '../redux/reducers/notifications';
import responses from '../redux/reducers/responses';
import tokens from '../redux/reducers/tokens';
import update from '../redux/reducers/update';

const mainStore = configureStore({
  reducer: {
    communicator,
    notifications,
    responses,
    update,
    tokens,
    chat,
    app,
  },
});

export default mainStore;
