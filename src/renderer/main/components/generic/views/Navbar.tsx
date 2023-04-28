import React from 'react';
import * as animation from '../../../../shared/animation';
import * as enums from '../../../enums';
import { Link } from '../../customs';
import * as themed from '../themed';
import { NavBody, NavButton, NavContainer, NavIcons } from '../themed';
import toggleNav from '../utils';

const Navbar: React.FC<{
  setAppActive: React.Dispatch<React.SetStateAction<enums.EActiveAppStates>>;
  appActive: enums.EActiveAppStates;
  setSettings: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setAppActive, appActive, setSettings }) => {
  return (
    <>
      <themed.NavSwitch
        $active={appActive === enums.EActiveAppStates.Inactive}
        data-cy="navSwitch"
        onClick={(): void => toggleNav(setAppActive, appActive)}
      >
        <i className="icon-left-open-outline navIcon" />
      </themed.NavSwitch>
      <NavContainer id="navbar" variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
        <NavBody>
          <NavIcons>
            <NavButton data-cy="nav-button-home">
              <Link to="/" replace>
                <h4>Home</h4>
              </Link>
            </NavButton>

            <NavButton data-cy="nav-button-accounts">
              <Link to="/accounts" replace>
                <h4>Accounts</h4>
              </Link>
            </NavButton>

            <NavButton data-cy="nav-button-accounts">
              <Link to="/sockets" replace>
                <h4>Chat</h4>
              </Link>
            </NavButton>
          </NavIcons>

          <NavIcons>
            <NavButton data-cy="nav-button-settings" onClick={(): void => setSettings(true)}>
              <i className="icon-cog-outline navIcon" />
            </NavButton>
          </NavIcons>
        </NavBody>
      </NavContainer>
    </>
  );
};

export default Navbar;
