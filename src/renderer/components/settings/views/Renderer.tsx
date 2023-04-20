import React, { useState } from 'react';
import type { DefaultTheme } from 'styled-components';
import * as animation from '../../../animation';
import * as enums from '../../../enums';
import { Checkbox, Header, Inline } from '../../customs';
import { InnerSection, PanelButton, Section } from '../themed';
import changeTheme from '../utils';

export const Theme: React.FC<{
  setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
  theme: DefaultTheme;
}> = ({ setTheme, theme }) => {
  const [value, setValue] = useState<boolean>(theme.themeState === enums.EThemes.Dark);

  return (
    <InnerSection>
      <Header>Theme</Header>
      <Inline>
        <h3>Dark mode</h3>
        <Checkbox
          type="checkbox"
          data-cy="theme-checkbox"
          checked={value}
          onChange={(): void => {
            setValue(!value);
            changeTheme(setTheme, theme);
          }}
        />
      </Inline>
    </InnerSection>
  );
};

export const renderButton = (
  setTarget: React.Dispatch<React.SetStateAction<enums.ESettingsPanels>>,
  target: enums.ESettingsPanels,
): JSX.Element[] => {
  const keys = Object.keys(enums.ESettingsPanels) as (keyof typeof enums.ESettingsPanels)[];

  return keys.map((k) => {
    if (target === enums.ESettingsPanels[k]) {
      return (
        <PanelButton
          data-cy={`settings-button-${enums.ESettingsPanels[k]}`}
          $active
          key={k}
          onClick={(): void => setTarget(enums.ESettingsPanels[k])}
        >
          {k}
        </PanelButton>
      );
    }

    return (
      <PanelButton
        data-cy={`settings-button-${enums.ESettingsPanels[k]}`}
        key={k}
        onClick={(): void => setTarget(enums.ESettingsPanels[k])}
      >
        {k}
      </PanelButton>
    );
  });
};

export const Generic: React.FC<{
  theme: DefaultTheme;
  setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
}> = ({ setTheme, theme }) => {
  return (
    <Section
      $centered
      $fill
      $full
      $direction="column"
      $justify="flex-start"
      $align="center"
      variants={animation.slideRight}
      initial="init"
      animate="visible"
      exit="exit"
      data-cy="settings-section-theme"
    >
      <Theme setTheme={setTheme} theme={theme} />
    </Section>
  );
};
