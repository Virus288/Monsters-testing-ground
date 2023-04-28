/* eslint global-require: off, no-console: off, promise/always-return: off */

import { app } from "electron";
import App from "../backend";
import AppUpdater from "./update";
import Windows from "./windows";

const backend = new App();
backend.initApp();

const handleDeadWindow = (id: number): void => {
  backend.fullFillDeadWindow(id);
};

const handleNewWindow = (id: number): void => {
  backend.startNewWindow(id);
};

const windowsManager = new Windows(handleDeadWindow, handleNewWindow);

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') require('electron-debug')();

app.on('window-all-closed', () => {
  app.quit();
});

app
  .whenReady()
  .then(() => {
    windowsManager.listen();
    windowsManager.createMainWindow();
    new AppUpdater().listen();
    app.on('activate', () => {
      // On macOS, it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      windowsManager.createMainWindow();
    });
  })
  .catch(console.log);
