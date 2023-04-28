import { EMessageTypes } from '../../../enums';

export const generateAvailableUsers = (users: string[]): JSX.Element[] => {
  return users.map((u) => {
    return (
      <option key={u} value={u}>
        {u}
      </option>
    );
  });
};

export const generateAvailableMessages = (): JSX.Element => {
  return (
    <>
      <option value={EMessageTypes.Get}>Get messages</option>
      <option value={EMessageTypes.GetUnread}>Get unread messages</option>
      <option value={EMessageTypes.GetWithDetails}>Get with details</option>
      <option value={EMessageTypes.Send}>Send message</option>
      <option value={EMessageTypes.Read}>Read message</option>
    </>
  );
};
