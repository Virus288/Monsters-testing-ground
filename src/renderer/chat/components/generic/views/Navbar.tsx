import React from 'react';
import { Link, Button } from '../../../../main/components/customs';
import { NavContainer, NavIcons, NavButton, NavBody, NavSwitch } from '../../../../main/components/generic/themed';
import type * as enums from '../../../../main/enums';
import { EActiveAppStates } from '../../../../main/enums';
import * as animation from '../../../../shared/animation';
import { connect, disconnect } from '../../../controllers';
import * as hooks from '../../../redux';
import { useMainSelector, useMainDispatch } from '../../../redux/hooks';
import toggleNav from '../utils';

const Navbar: React.FC<{
  setAppActive: React.Dispatch<React.SetStateAction<enums.EActiveAppStates>>;
  appActive: enums.EActiveAppStates;
  setSettings: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setAppActive, appActive, setSettings }) => {
  const { status } = useMainSelector(hooks.socketState);
  const { owner } = useMainSelector(hooks.appState);
  const dispatch = useMainDispatch();

  return (
    <>
      <NavSwitch
        $active={appActive === EActiveAppStates.Inactive}
        data-cy="navSwitch"
        onClick={(): void => toggleNav(setAppActive, appActive)}
      >
        <i className="icon-left-open-outline navIcon" />
      </NavSwitch>
      <NavContainer id="navbar" variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
        <NavBody>
          <NavIcons>
            <NavButton data-cy="nav-button-home">
              <Link to="/" replace>
                <h4>Get</h4>
              </Link>
            </NavButton>

            <NavButton data-cy="nav-button-home">
              <Link to="/getraw" replace>
                <h4>Get raw</h4>
              </Link>
            </NavButton>

            <NavButton data-cy="nav-button-home">
              <Link to="/send" replace>
                <h4>Send</h4>
              </Link>
            </NavButton>

            <NavButton data-cy="nav-button-home">
              <Link to="/sendraw" replace>
                <h4>Send raw</h4>
              </Link>
            </NavButton>
          </NavIcons>

          <NavIcons>
            {status ? (
              <Button onClick={(): void => disconnect(owner!, dispatch)}>Disconnect</Button>
            ) : (
              <Button onClick={(): void => connect(owner!, dispatch)}>Connect</Button>
            )}
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
