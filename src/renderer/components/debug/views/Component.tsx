import React from 'react';
import * as renderer from './Renderer';
import { Container, ContainerBody, Header, PanelHeader } from '../../customs';
import * as animation from '../../../animation';
import Handler from '../handler';
import { useMainDispatch } from '../../../redux/hooks';
import { Section } from '../../settings/themed';

const Debug: React.FC = () => {
  const dispatch = useMainDispatch();
  const handler = new Handler(dispatch);

  return (
    <Container variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody $justify="flex-start">
        <PanelHeader data-cy="debug-header-main">Debug</PanelHeader>

        <Header>Notifications</Header>
        <Section $direction="row">
          <renderer.ToggleNotification handler={handler} />
          <renderer.ToggleUpdateNotification handler={handler} />
        </Section>
      </ContainerBody>
    </Container>
  );
};

export default Debug;
