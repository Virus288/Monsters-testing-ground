import type { RootMainState } from '../store/types';
import type * as types from './types';

export const notificationsState = (state: RootMainState): types.INotificationsState => state.notifications;

export const communicatorState = (state: RootMainState): types.ICommunicatorState => state.communicator;
export const updateState = (state: RootMainState): types.IUpdateState => state.update;
export const appState = (state: RootMainState): types.IAppState => state.app;
export const responsesState = (state: RootMainState): types.IResponsesState => state.responses;
export const tokensState = (state: RootMainState): types.ITokensState => state.tokens;
