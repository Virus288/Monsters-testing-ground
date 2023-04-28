import { motion } from 'framer-motion';
import styled from 'styled-components';
import type { IDefaultChildren } from '../../../../main/types';

// eslint-disable-next-line import/prefer-default-export
export const Settings = styled(motion.div)<IDefaultChildren>`
  height: 75px;
  width: 100%;
  font-size: 1.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  overflow-y: hidden;
  overflow-x: hidden;

  form {
    flex-direction: row-reverse;
  }

  span {
    width: 40%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    * {
      margin: 10px;
    }
  }
`;
