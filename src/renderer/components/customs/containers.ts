import { motion } from 'framer-motion';
import styled from 'styled-components';
import type * as localTypes from '../../types';

/**
 * Container of elements used to cover space
 */
export const Container = styled(motion.div)<localTypes.IDefaultChildren>`
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;
`;

/**
 * Container's body user to center elements inside
 */
export const ContainerBody = styled(Container)<localTypes.IContainerProps>`
  display: flex;
  flex-direction: ${(props): string => props.$direction ?? 'column'};
  justify-content: ${(props): string => props.$justify ?? 'center'};
  align-items: ${(props): string => props.$align ?? 'center'};
  flex-wrap: ${(props): string => props.$wrap ?? 'wrap'};
  overflow-y: ${(props): string => (props.$noScroll ? 'hidden' : 'auto')};
  overflow-x: hidden;
  background: ${(props): string => props.theme.background.semiTransparent};
  color: ${(props): string => props.theme.colors.default};
  transition: ${(props): string => props.theme.transition.semiSlow};

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

/**
 * Container used as overlay
 */
export const OverlayContainer = styled(Container)<localTypes.IDefaultChildren>`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
`;

export const Inline = styled(motion.span)<localTypes.IDefaultChildren>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  width: fit-content;

  * {
    margin: 5px;
  }
`;
