import type { MainDispatch } from '../../../store/types';
import { Header, Button } from '../../customs';
import { Section } from '../../settings/themed';
import { openChat } from '../controller';

// eslint-disable-next-line import/prefer-default-export
export const generateAvailableUsers = (users: string[], dispatch: MainDispatch): JSX.Element[] => {
  return users.map((u) => {
    return (
      <Section key={u} $full>
        <Header>{u}</Header>
        <Button onClick={(e): void => openChat(e, u, dispatch)}>Open chat</Button>
      </Section>
    );
  });
};
