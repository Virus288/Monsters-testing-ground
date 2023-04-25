import { motion } from 'framer-motion';
import styled from 'styled-components';
import { moveAround, rotate } from './animations';

export const LoadingCircle = styled(motion.div)`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid ${(props): string => props.theme.colors.default};
  box-sizing: border-box;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-sizing: border-box;
    border: 2px solid transparent;
    border-right-color: ${(props): string => props.theme.colors.ohOrange};
    animation: ${rotate} 2s linear infinite;
  }
`;

export const LoadingPill = styled(motion.div)`
  position: relative;
  width: 300px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid ${(props): string => props.theme.colors.default};
  box-sizing: border-box;

  &::after {
    content: '';
    background: ${(props): string => props.theme.colors.ohOrange};
    position: absolute;
    top: 0;
    left: 0;
    width: 20%;
    height: 100%;
    border-radius: 10px;
    box-sizing: border-box;
    animation: ${moveAround} 2s ease-in-out infinite;
  }
`;

export const HelpIcon = styled(motion.h3)`
  &:hover {
    &:after {
      opacity: 1;
    }
  }

  &::after {
    width: fit-content;
    max-width: 450px;
    height: fit-content;
    position: fixed;
    opacity: 0;
    border-radius: 10px;
    pointer-events: none;
    background: ${(props): string => props.theme.background.default};
    transition: ${(props): string => props.theme.transition.semiSlow};
  }
`;

export const LoginIcon = styled(HelpIcon)`
  &:after {
    content: 'Login should only contain arabic letters, numbers and special characters with lenght 4-29';
  }
`;

export const PasswordIcon = styled(HelpIcon)`
  &:after {
    content: 'Password should contain at least 1 digit, 6 letter, 1 upper case letter and 1 lower case letter with length 7-199';
  }
`;

export const EmailIcon = styled(HelpIcon)`
  &:after {
    content: 'Email should have max length of 199 charactes';
  }
`;

export const AlreadyLoggedInIcon = styled(HelpIcon)`
  color: red;

  &:after {
    content: 'Already logged in as this user';
  }
`;
