import devConfig from '../../../assets/configs/devConfig.json';
import prodConfig from '../../../assets/configs/prodConfig.json';
import type * as types from '../../types';

const getCache = (): string => {
  let path = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
  const cache = process.platform === 'win32' ? 'AppData/Roaming' : '.cache';
  const name = process.env.APP_NAME ?? process.env.npm_package_name;

  if (!path) throw new Error('Platform unknown. Cannot find cache folder');
  path += `/${cache}/monsters/${name ?? 'undefined'}`;
  return path;
};

export const getConfig = (): types.IConfig => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return prodConfig as types.IConfig;
    case 'development':
    default:
      return devConfig as types.IConfig;
  }
};
export default getCache;
