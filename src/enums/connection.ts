export enum EConnectionChannels {
  Connection = 'connection',
  Update = 'update',
  Window = 'window',
}

export enum EResponseCallback {
  Data = 'data',
  Error = 'error',
  Client = 'client',
  CreateClient = 'createClient',
  RemoveClient = 'removeClient',
  Log = 'log',
  Version = 'version',
  Window = 'window',
}

export enum ESocketChannels {
  Connect = 'connect',
  Disconnect = 'disconnect',
  SendMessage = 'sendMessage',
}

export enum EConnectionType {
  Chat = 'chat',
  Main = 'main',
}
