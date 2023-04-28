import { motion } from 'framer-motion';
import styled, { createGlobalStyle } from 'styled-components';
import * as enums from '../../enums';
import type * as localTypes from '../../types';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    min-height: 100vh;
    background: ${(props): string => props.theme.background.default};
    font-family: "JetBrains Mono ExtraLight", serif;

  }
`;

export const App = styled(motion.div)<localTypes.IDefaultChildren>`
  background: ${(props): string => props.theme.background.default};
  color: ${(props): string => props.theme.colors.default};
  transition: ${(props): string => props.theme.transition.slow};
  width: 100%;
  padding-left: ${(props): number => {
    switch (props.theme.appState) {
      case enums.EActiveAppStates.Active:
        return 150;
      case enums.EActiveAppStates.SemiActive:
        return 75;
      case enums.EActiveAppStates.Inactive:
      default:
        return 0;
    }
  }}px;
`;

export interface INavbarProps extends localTypes.IDefaultChildren {
  $active?: boolean;
}
