import { configureStore } from '@reduxjs/toolkit';
import app from '../redux/reducers/app';
import communicator from '../redux/reducers/communicator';
import notifications from '../redux/reducers/notifications';
import responses from '../redux/reducers/responses';
import update from '../redux/reducers/update';

const mainStore = configureStore({
  reducer: {
    communicator,
    notifications,
    responses,
    update,
    app,
  },
});

export default mainStore;
