import type React from 'react';
import * as enums from '../../enums';

const toggleNav = (
  setAppActive: React.Dispatch<React.SetStateAction<enums.EActiveAppStates>>,
  appActive: enums.EActiveAppStates,
): void => {
  switch (appActive) {
    case enums.EActiveAppStates.Active:
      return setAppActive(enums.EActiveAppStates.SemiActive);
    case enums.EActiveAppStates.SemiActive:
      return setAppActive(enums.EActiveAppStates.Inactive);
    case enums.EActiveAppStates.Inactive:
    default:
      return setAppActive(enums.EActiveAppStates.Active);
  }
};

export default toggleNav;
