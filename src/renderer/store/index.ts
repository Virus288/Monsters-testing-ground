import { configureStore } from '@reduxjs/toolkit';
import communicator from '../redux/reducers/communicator';
import notifications from '../redux/reducers/notifications';
import update from '../redux/reducers/update';
import app from '../redux/reducers/app';

const mainStore = configureStore({
  reducer: {
    communicator,
    notifications,
    update,
    app,
  },
});

export default mainStore;
