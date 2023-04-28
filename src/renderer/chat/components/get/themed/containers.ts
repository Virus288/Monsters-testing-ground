import { motion } from 'framer-motion';
import styled from 'styled-components';
import type { IDefaultChildren } from '../../../../main/types';

// eslint-disable-next-line import/prefer-default-export
export const LogsBody = styled(motion.div)<IDefaultChildren>`
  width: 90%;
  max-width: 1500px;
  height: auto;
  min-height: 20vh;
  max-height: 70vh;
  margin: 0 auto;
  border-left: 1px solid ${(props): string => props.theme.colors.default};
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 5px;
  scroll-behavior: smooth;
  color: ${(props): string => props.theme.colors.default};
  transition: ${(props): string => props.theme.transition.default};

  &::-webkit-scrollbar {
    width: 15px;
    border-radius: 50px;
    background: ${(props): string => props.theme.background.default};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props): string => props.theme.background.opposite};
    border-radius: 50px;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const Log = styled(motion.span)`
  padding: 5px;
  width: 100%;
`;
