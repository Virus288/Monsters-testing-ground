import { motion } from 'framer-motion';
import styled from 'styled-components';
import * as enums from '../../../enums';
import type * as localTypes from '../../../types/theme';
import type { INavbarProps } from '../../customs';

export const NavContainer = styled(motion.div)<localTypes.IDefaultChildren>`
  position: fixed;
  top: 0;
  left: ${(props): number => (props.theme.appState === enums.EActiveAppStates.Active ? 0 : -75)}px;
  height: 100vh;
  width: ${(props): number => (props.theme.appState === enums.EActiveAppStates.Inactive ? 75 : 150)}px;
  background: ${(props): string => props.theme.background.semiTransparent};
  color: ${(props): string => props.theme.colors.default};
  padding: 0;
  box-shadow: ${(props): string | null =>
    props.theme.appState === enums.EActiveAppStates.Inactive ? null : `4px 0 1px ${props.theme.shadows.default}`};
  transition: ${(props): string => props.theme.transition.semiSlow};
  z-index: 7;

  &:hover {
    left: 0;
    width: 150px;
  }
`;

export const NavBody = styled(motion.div)<localTypes.IDefaultChildren>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-wrap: nowrap;
  font-size: 1.1rem;
  overflow-y: scroll;
  overflow-x: hidden;
  transition: ${(props): string => props.theme.transition.default};
  opacity: ${(props): number => (props.theme.appState === enums.EActiveAppStates.Active ? 1 : 0)};

  &::-webkit-scrollbar {
    width: 0;
  }

  &:hover {
    opacity: 1;
  }
`;

export const NavIcons = styled(motion.div)<localTypes.IDefaultChildren>`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NavButton = styled('button')<localTypes.IDefaultChildren>`
  height: 50px;
  background: none;
  font-size: 1.5rem;
  margin: 4px;
  border: none;
  cursor: pointer;
  color: ${(props): string => props.theme.colors.default};
  transition: ${(props): string => props.theme.transition.default};

  i {
    font-size: 2.3rem;
    color: ${(props): string => props.theme.colors.ohOrange};
    border-radius: 50%;
    background-size: 100% 100%;
  }
`;

export const NavSwitch = styled(NavButton)<INavbarProps>`
  color: ${(props): string => props.theme.colors.ohOrange};
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 8;
  transform: ${(props): string => (props.$active ? 'rotate(180deg)' : 'rotate(0deg)')};
`;
