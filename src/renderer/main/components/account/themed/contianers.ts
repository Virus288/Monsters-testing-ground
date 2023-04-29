import { motion } from 'framer-motion';
import styled from 'styled-components';
import type * as localTypes from '../../../types';

// eslint-disable-next-line import/prefer-default-export
export const UserCard = styled(motion.div)<localTypes.IDefaultChildren>`
  min-width: 250px;
  max-width: 4000px;
  min-height: 400px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  overflow-y: hidden;
  overflow-x: hidden;
  margin: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 1px 1px 3px ${(props): string => props.theme.shadows.black};
  color: ${(props): string => props.theme.colors.default};
  transition: ${(props): string => props.theme.transition.semiSlow};

  * {
    margin: 10px;
  }
`;

export const UserPicture = styled(motion.div)<localTypes.IDefaultChildren>`
  width: 200px;
  height: 200px;
  border: 1px solid ${(props): string => props.theme.colors.ohOrange};
  border-radius: 100%;

  &:hover {
    &:after {
      opacity: 1;
    }
  }

  &::after {
    content: 'Here should be some stock image but...';
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
