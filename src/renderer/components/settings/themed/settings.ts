import { motion } from 'framer-motion';
import styled from 'styled-components';
import type * as types from '../../../types';
import { NavButton } from '../../generic/themed';

export const Section = styled(motion.div)<types.ISectionProps>`
  display: flex;
  flex-direction: ${(props): string => props.$direction ?? 'column'};
  justify-content: ${(props): string => props.$justify ?? 'flex-start'};
  align-items: ${(props): string => props.$align ?? 'center'};
  flex-wrap: ${(props): string => props.$wrap ?? 'wrap'};
  width: ${(props): string => (props.$full ? '100%' : 'fit-content')};
  overflow-x: auto;
  height: ${(props): string => (props.$fill ? '100%' : 'auto')};
  margin: ${(props): number => (props.$centered ? 0 : 1)}rem;
  padding: ${(props): number => (props.$centered ? 0 : 1)}rem;

  &::-webkit-scrollbar {
    width: 15px;
    border-radius: 50px;
    background: ${(props): string => props.theme.background.opposite};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props): string => props.theme.colors.ohOrange};
    border-radius: 50px;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const Body = styled(motion.div)<types.IDefaultChildren>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 140px;
  height: 100%;
  transition: ${(props): string => props.theme.transition.default};
`;

export const PanelButton = styled(NavButton)<types.ISettingsButtons>`
  font-size: 1.8rem;
  align-self: flex-start;

  &:after {
    position: fixed;
    content: '•';
    color: ${(props): string => (props.$active ? props.theme.colors.ohOrange : 'transparent')};
    display: inline-block;
    font-weight: bolder;
    text-align: center;
    margin-left: 0.5em;
    cursor: ${(props): string => (props.$active ? 'pointer' : 'default')};
    transition: ${(props): string => props.theme.transition.default};
  }

  &:hover {
    color: ${(props): string => props.theme.colors.ohOrange};
  }
`;

export const InnerSection = styled(Section)<types.ISectionProps>`
  box-shadow: ${(props): string => `1px 0 3px ${props.theme.shadows.default}`};
  border-radius: 10px;

  header {
    width: fit-content;
  }
`;
