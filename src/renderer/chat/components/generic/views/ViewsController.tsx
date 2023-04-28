import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import type { DefaultTheme } from 'styled-components';
import { App as MainApp } from '../../../../main/components/customs';
import Loading from '../../../../main/components/generic/views/Loading';
import Notifications from '../../../../main/components/notifications/views/Component';
import type * as enums from '../../../../main/enums';
import * as hooks from '../../../../main/redux';
import { useMainSelector, useMainDispatch } from '../../../../main/redux/hooks';
import Router from '../../../Router';
import Settings from '../../settings/views/Component';
import { logIn } from '../controller';
import Navbar from './Navbar';

const StaticHandlers: React.FC<{
  setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
  setSettings: React.Dispatch<React.SetStateAction<boolean>>;
  settings: boolean;
}> = ({ setTheme, settings, setSettings }) => {
  return (
    <AnimatePresence mode="wait">
      {settings ? <Settings setTheme={setTheme} disablePanel={(): void => setSettings(false)} /> : null}
    </AnimatePresence>
  );
};

const ViewsController: React.FC<{
  setAppActive: React.Dispatch<React.SetStateAction<enums.EActiveAppStates>>;
  appActive: enums.EActiveAppStates;
  setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
}> = ({ setAppActive, appActive, setTheme }) => {
  const { initialized } = useMainSelector(hooks.appState);
  const dispatch = useMainDispatch();
  const [settings, setSettings] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    logIn(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (!initialized) return;

    setTimeout(() => {
      setFinished(true);
    }, 2000);

    setTimeout(() => {
      setReady(true);
    }, 3000);
  }, [initialized]);

  return !ready ? (
    <Loading finished={finished} />
  ) : (
    <>
      <Notifications />
      <MainApp id="app">
        <StaticHandlers setTheme={setTheme} settings={settings} setSettings={setSettings} />
        <Navbar setAppActive={setAppActive} appActive={appActive} setSettings={setSettings} />
        <Router />
      </MainApp>
    </>
  );
};

export default ViewsController;
