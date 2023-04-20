import styled from 'styled-components';
import { motion } from 'framer-motion';
import type * as localTypes from '../../../types';
import { ExitButton } from '../../customs';

export const Notification = styled(motion.div)<localTypes.INotificationProps>`
  position: fixed;
  top: ${(props): number => props.$nth * 60 + 70}px;
  right: 20px;
  min-height: 50px;
  height: fit-content;
  min-width: 250px;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid ${(props): string => props.theme.colors.default};
  background: ${(props): string => props.theme.background.semiTransparent};
  box-shadow: ${(props): string => `1px 1px 1px ${props.theme.colors.default}`};
  color: ${(props): string => props.theme.colors.default};
  z-index: 9;
`;

export const DisableNotifications = styled(ExitButton)<localTypes.IDefaultChildren>`
  right: 80px;
  left: auto;

  h2 {
    font-size: 1.6em;
    font-weight: 200;
  }
`;

export const UpdateNotification = styled(Notification)<localTypes.INotificationProps>`
  &:hover {
    cursor: pointer;
  }
`;
