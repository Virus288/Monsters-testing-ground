import { HashRouter } from 'react-router-dom';
import React, { useState } from 'react';
import type { DefaultTheme } from 'styled-components';
import * as enums from './enums';
import * as themes from './components/customs/theme';
import Theme, { GlobalStyle } from './components/customs';
import ViewsController from './components/generic/views/ViewsController';

const App: React.FC = () => {
  const [appActive, setAppActive] = useState<enums.EActiveAppStates>(enums.EActiveAppStates.Active);
  const [theme, setTheme] = useState<DefaultTheme>(themes.lightTheme);

  return (
    <Theme theme={theme} appState={appActive}>
      <HashRouter>
        <GlobalStyle />
        <ViewsController appActive={appActive} setAppActive={setAppActive} setTheme={setTheme} />
      </HashRouter>
    </Theme>
  );
};

export default App;
