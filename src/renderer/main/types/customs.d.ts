import type { IDefaultChildren } from './theme';

export interface IContainerProps extends IDefaultChildren {
  $direction?: string;
  $justify?: string;
  $align?: string;
  $wrap?: string;
  $noScroll?: boolean;
  $full?: boolean;
}

export interface IHeaderProps extends IDefaultChildren {
  $center?: boolean;
}

export interface INotificationProps extends IDefaultChildren {
  $nth: number;
}

export interface ISectionProps extends IContainerProps {
  $centered?: boolean;
  $fill?: boolean;
}

export interface ISettingsButtons extends IDefaultChildren {
  $active?: boolean;
}
