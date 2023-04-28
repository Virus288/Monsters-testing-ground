import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import type { DefaultTheme } from 'styled-components';
import { EResponseCallback, EUpdateChannels } from '../../../../../enums';
import type * as enums from '../../../enums';
import * as hooks from '../../../redux';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';
import Router from '../../../Router';
import { App as MainApp } from '../../customs';
import { logIn } from '../../home/controller';
import Components from '../../index';
import Notifications from '../../notifications/views/Component';
import Loading from './Loading';

const StaticHandlers: React.FC<{
  setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
  setSettings: React.Dispatch<React.SetStateAction<boolean>>;
  settings: boolean;
}> = ({ setTheme, settings, setSettings }) => {
  const dispatch = useMainDispatch();

  useEffect(() => {
    dispatch(
      hooks.sendMessage({
        message: undefined,
        target: EUpdateChannels.CheckUpdate,
        type: EResponseCallback.Version,
      }),
    );
  }, [dispatch]);

  return (
    <AnimatePresence mode="wait">
      {settings ? <Components.Settings setTheme={setTheme} disablePanel={(): void => setSettings(false)} /> : null}
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
        <Components.Navbar setAppActive={setAppActive} appActive={appActive} setSettings={setSettings} />
        <Router />
      </MainApp>
    </>
  );
};

export default ViewsController;
