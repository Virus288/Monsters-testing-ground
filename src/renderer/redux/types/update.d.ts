import type { PayloadAction } from '@reduxjs/toolkit';

export interface IUpdateState {
  available?: boolean;
  version?: string;
  notes?: string;
  progress?: number;
  ready?: boolean;
}

interface IUpdateActionBody {
  progress?: number;
  ready?: boolean;
}

interface ICheckUpdateActionBody {
  available?: boolean;
  version?: string;
  notes?: string;
}

export type IUpdateAction = PayloadAction<IUpdateActionBody>;
export type ICheckUpdateAction = PayloadAction<ICheckUpdateActionBody>;
