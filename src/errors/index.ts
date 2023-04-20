// eslint-disable-next-line max-classes-per-file
import type { IFullError } from '../types';

export class FullError extends Error implements IFullError {
  code = '005';
}

export class NoRoot extends FullError {
  constructor() {
    super('NoRoot');
    this.message = 'Root target does not exist';
    this.name = 'NoRoot';
    this.code = '001';
  }
}
