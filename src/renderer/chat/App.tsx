import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import type { DefaultTheme } from 'styled-components';
import Theme, { GlobalStyle } from '../main/components/customs';
import * as themes from '../main/components/customs/theme';
import * as enums from '../main/enums';
import Components from './components';
import ViewsController from './components/generic/views/ViewsController';

const App: React.FC = () => {
  const [appActive, setAppActive] = useState<enums.EActiveAppStates>(enums.EActiveAppStates.Active);
  const [theme, setTheme] = useState<DefaultTheme>(themes.lightTheme);

  return (
    <Theme theme={theme} appState={appActive}>
      <HashRouter>
        <Components.Communicator />
        <GlobalStyle />
        <ViewsController appActive={appActive} setAppActive={setAppActive} setTheme={setTheme} />
      </HashRouter>
    </Theme>
  );
};

export default App;
