export enum ESocketActionType {
  Logs = 'logs',
  Messages = 'messages',
  Status = 'status',
}

export enum ESocketTarget {
  SendManual = 'sendManual',
  SendMessage = 'sendMessage',
  Logs = 'logs',
  Messages = 'messages',
}

export enum EMessageTypes {
  Send = 'send',
  Get = 'get',
  GetWithDetails = 'getWithDetails',
  GetUnread = 'getUnread',
  Read = 'read',
}
