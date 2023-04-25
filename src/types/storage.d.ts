export interface IUserTokensBody {
  target: string;
  access: string;
  refresh: string;
}

export interface ISafeStorageKeys {
  keys: IUserTokensBody[];
}
