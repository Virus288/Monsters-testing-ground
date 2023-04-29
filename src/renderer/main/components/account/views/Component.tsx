import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import * as animation from '../../../../shared/animation';
import * as hooks from '../../../redux';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';
import { Button, Container, ContainerBody } from '../../customs';
import { Section } from '../../settings/themed';
import { AddAccount, renderUsers } from './Renderer';

const Account: React.FC = () => {
  const dispatch = useMainDispatch();
  const [add, setAdd] = useState<boolean>(false);
  const tokens = useMainSelector(hooks.tokensState).tokens.map((e) => {
    return e.target;
  });

  return (
    <>
      <AnimatePresence mode="wait">{add ? <AddAccount users={tokens} setAdd={setAdd} /> : null}</AnimatePresence>

      <Container variants={animation.slideRight} initial="init" animate="visible" exit="exit">
        <ContainerBody $justify="flex-start">
          <Section $full>
            <Button onClick={(): void => setAdd(true)}>Add account</Button>
          </Section>

          <Section $direction="row">{renderUsers(tokens, dispatch)}</Section>
        </ContainerBody>
      </Container>
    </>
  );
};

export default Account;
