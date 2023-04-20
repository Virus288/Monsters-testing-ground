// update

import React from 'react';
import { useSelector } from 'react-redux';
import * as animation from '../../../animation';
import * as hooks from '../../../redux';
import { useMainDispatch } from '../../../redux/hooks';
import { Button, Container, ContainerBody, Header, PanelHeader } from '../../customs';
import { installUpdate, sendUpdate } from '../controllers';
import * as renders from './Renderer';

const Update: React.FC = () => {
  const { notes, version, available, ready } = useSelector(hooks.updateState);
  const dispatch = useMainDispatch();

  return (
    <Container variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody $justify="flex-start">
        <PanelHeader data-cy="debug-header-main">Update</PanelHeader>

        <Header>Version: {version}</Header>
        {renders.RenderNotes(notes)}
        {ready ? (
          <Button onClick={(): void => installUpdate(dispatch)}>Install</Button>
        ) : (
          <Button onClick={(): void => sendUpdate(dispatch, available ?? false)}>Update</Button>
        )}
      </ContainerBody>
    </Container>
  );
};

export default Update;
