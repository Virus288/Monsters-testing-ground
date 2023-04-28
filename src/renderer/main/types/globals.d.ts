import type { Channels } from '../../main/preload';
import type mainStore from '../store';

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    store: typeof mainStore;
    electron: {
      ipcRenderer: {
        send(channel: Channels, args: string): void;
        on(channel: Channels, func: (args: string) => void): (() => void) | undefined;
        once(channel: Channels, func: (args: string) => void): (() => void) | undefined;
      };
    };
  }
}

export {};
