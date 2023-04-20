import type React from 'react';
import type { DefaultTheme } from 'styled-components';
import { EThemes } from '../../enums';
import * as themes from '../customs/theme';

const changeTheme = (setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>, theme: DefaultTheme): void =>
  theme.themeState === EThemes.Light ? setTheme(themes.darkTheme) : setTheme(themes.lightTheme);

export default changeTheme;
