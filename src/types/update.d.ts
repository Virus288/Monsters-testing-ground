export interface IUpdateDetails {
  available: boolean;
  version?: string;
  notes?: string;
}

export interface IUpdateDownloadDetails {
  progress: number;
  ready: boolean;
}
