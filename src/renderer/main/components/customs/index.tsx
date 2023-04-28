import React from 'react';
import type { DefaultTheme } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import type * as enums from '../../enums';

export * from './buttons';
export * from './generic';
export * from './containers';
export * from './forms';
export * from './icons';
export * from './animations';
export * from './text';

const Theme: React.FC<{
  children: React.ReactNode;
  theme: DefaultTheme;
  appState: enums.EActiveAppStates;
}> = ({ children, theme, appState }) => {
  const th = { ...theme, appState };
  return <ThemeProvider theme={th}>{children}</ThemeProvider>;
};

export default Theme;
