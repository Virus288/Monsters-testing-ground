import { motion } from 'framer-motion';
import { Link as ReactLink } from 'react-router-dom';
import styled from 'styled-components';
import type * as localTypes from '../../types';

const BaseButton = styled(motion.button)<localTypes.IDefaultChildren>`
  background: linear-gradient(
    140deg,
    ${(props): string => props.theme.colors.ohOrange} 0.5%,
    ${(props): string => props.theme.background.semiTransparent} 0.5%
  );
  background-size: 100% 100%;
  color: ${(props): string => props.theme.colors.default};
  padding: 3px;
  margin: 10px 0;
  border: 2px solid ${(props): string => props.theme.colors.ohOrange};
  border-radius: 5%;
  box-shadow: 1px 1px 3px ${(props): string => props.theme.shadows.black};
  width: 80%;
  transition: ${(props): string => props.theme.transition.default};
  font-weight: 200;
  letter-spacing: 0.9px;
  cursor: pointer;

  &:hover {
    box-shadow: none;
    transition: ${(props): string => props.theme.transition.default};
    background-size: 30000% 100%;
  }
`;

export const Button = styled(BaseButton)<localTypes.IDefaultChildren>`
  font-size: 1.5em;
  width: 80%;
  min-width: 150px;
  max-width: 300px;
  height: 45px;
`;

export const ExitButton = styled(motion.button)<localTypes.IDefaultChildren>`
  position: fixed;
  top: 0;
  left: 0;
  font-size: 2.3em;
  color: ${(props): string => props.theme.colors.ohOrange};
  background: none;
  border: none;
  margin: 5px;
  padding: 0.25em 1em;
  cursor: pointer;
  z-index: 9;
`;

export const ButtonLink = styled(ReactLink)<localTypes.IDefaultChildren>`
  text-decoration: none;
  text-align: left;
  color: ${(props): string => props.theme.colors.default};
  transition: ${(props): string => props.theme.transition.semiSlow};
`;

export const Link = styled(ButtonLink)<localTypes.IDefaultChildren>`
  &:hover {
    color: ${(props): string => props.theme.colors.ohOrange};
  }
`;
