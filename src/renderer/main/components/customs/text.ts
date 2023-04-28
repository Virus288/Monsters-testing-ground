import { motion } from 'framer-motion';
import styled from 'styled-components';
import type * as localTypes from '../../types';

export const Header = styled(motion.header)<localTypes.IDefaultChildren>`
  width: 50%;
  text-align: center;
  font-size: 2rem;
  font-weight: lighter;
  letter-spacing: 0.9px;
  padding: 1rem;
`;

export const PanelHeader = styled(Header)<localTypes.IHeaderProps>`
  width: ${(props): number => (props.$center ? 100 : 15)}%;
  font-size: 2.5rem;
  align-self: ${(props): string => (props.$center ? 'inherit' : 'flex-start')};
  margin: ${(props): string => (props.$center ? '0' : '0 1')}rem;
  border-bottom: 1px solid ${(props): string => props.theme.colors.default};
`;

export const BaseH3 = styled(motion.h3)<localTypes.IDefaultChildren>`
  text-align: center;
  font-size: 2rem;
  font-weight: lighter;
  padding: 1rem;
`;
export const Error = styled(BaseH3)<localTypes.IDefaultChildren>`
  width: 80%;
  font-size: 1.6rem;
  color: red;
`;

export const Success = styled(BaseH3)<localTypes.IDefaultChildren>`
  width: 80%;
  font-size: 1.6rem;
  color: green;
`;
