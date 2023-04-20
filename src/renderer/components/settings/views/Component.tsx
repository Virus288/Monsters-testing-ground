import React, { useState } from 'react';
import type { DefaultTheme } from 'styled-components';
import { useTheme } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import * as animation from '../../../animation';
import { Body, Section } from '../themed';
import * as enums from '../../../enums';
import { ContainerBody, ExitButton, OverlayContainer, PanelHeader } from '../../customs';
import * as renders from './Renderer';

const SettingsPanel: React.FC<{
  setTarget: React.Dispatch<React.SetStateAction<enums.ESettingsPanels>>;
  target: enums.ESettingsPanels;
}> = ({ setTarget, target }) => {
  return <Body>{renders.renderButton(setTarget, target)}</Body>;
};

const SettingsBody: React.FC<{
  target: enums.ESettingsPanels;
  setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
}> = ({ target, setTheme }) => {
  const theme = useTheme();

  const render = (): JSX.Element => {
    switch (target) {
      case enums.ESettingsPanels.Sample:
        return (
          <Section
            $centered
            $fill
            $direction="row"
            $justify="flex-start"
            $align="flex-start"
            variants={animation.slideRight}
            initial="init"
            animate="visible"
            exit="exit"
            data-cy="settings-section-sample"
          >
            <h2>Sample</h2>
          </Section>
        );
      case enums.ESettingsPanels.Generic:
      default:
        return <renders.Generic key={2} setTheme={setTheme} theme={theme} />;
    }
  };

  return <AnimatePresence mode="wait">{render()}</AnimatePresence>;
};

const Settings: React.FC<{
  disablePanel: () => void;
  setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
}> = ({ disablePanel, setTheme }) => {
  const [target, setTarget] = useState<enums.ESettingsPanels>(enums.ESettingsPanels.Generic);

  return (
    <OverlayContainer variants={animation.slideRight} initial="init" animate="visible" exit="exit">
      <ExitButton onClick={(): void => disablePanel()} data-cy="settings-button-exit">
        <i className="icon-left-open-outline navIcon" />
      </ExitButton>
      <ContainerBody $noScroll $wrap="nowrap" $justify="flex-start" $align="flex-start">
        <PanelHeader $center data-cy="settings-header-main">
          Settings
        </PanelHeader>

        <Section $wrap="nowrap" $full $centered $fill $direction="row">
          <SettingsPanel setTarget={setTarget} target={target} />
          <SettingsBody target={target} setTheme={setTheme} />
        </Section>
      </ContainerBody>
    </OverlayContainer>
  );
};

export default Settings;
