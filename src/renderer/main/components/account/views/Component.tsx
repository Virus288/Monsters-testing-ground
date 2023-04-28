import React, { useEffect, useState } from 'react';
import { EResponseSubTarget, EResponse } from '../../../../../enums';
import * as animation from '../../../../shared/animation';
import * as hooks from '../../../redux';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';
import { handleResponseError, handleResponseSuccess } from '../../../utils';
import { Container, ContainerBody, Error, Success } from '../../customs';
import { Section } from '../../settings/themed';
import { Login, Register } from './Renderer';

const Account: React.FC = () => {
  const dispatch = useMainDispatch();
  const { data } = useMainSelector(hooks.responsesState);
  const [err, setErr] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [type, setType] = useState<EResponse.Login | EResponse.Register>(EResponse.Login);
  const tokens = useMainSelector(hooks.tokensState).tokens.map((e) => {
    return e.target;
  });

  useEffect(() => {
    const response = data.find((e) => {
      return e.target === type;
    });
    if (response) {
      switch (response.payload.subTarget) {
        case EResponseSubTarget.Error:
          handleResponseError(response, dispatch, setErr, type);
          break;
        case EResponseSubTarget.Response:
          handleResponseSuccess(type === EResponse.Login ? 'Logged in' : 'Created account', dispatch, setSuccess, type);
          break;
        default:
          break;
      }
    }
  }, [data, data.length, dispatch, type]);

  useEffect(() => {
    setErr(null);
    setSuccess(null);
  }, [type]);

  return (
    <Container variants={animation.slideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody>
        <Section>{err ? <Error>{err}</Error> : null}</Section>
        <Section>{success ? <Success>{success}</Success> : null}</Section>

        <Section>
          {type === EResponse.Login ? (
            <Login setErr={setErr} setSuccess={setSuccess} setType={setType} users={tokens} />
          ) : (
            <Register setSuccess={setSuccess} setErr={setErr} setType={setType} users={tokens} />
          )}
        </Section>
      </ContainerBody>
    </Container>
  );
};

export default Account;
