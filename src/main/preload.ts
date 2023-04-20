import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { EConnectionChannels } from '../enums';

export type Channels = EConnectionChannels;

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send(channel: Channels, args: string) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (args: string) => void) {
      const subscription = (_event: IpcRendererEvent, args: string) => func(args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (args: string) => void) {
      const subscription = (_event: IpcRendererEvent, args: string) => func(args);
      ipcRenderer.once(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
  },
});
