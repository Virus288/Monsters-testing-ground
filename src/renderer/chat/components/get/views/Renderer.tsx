import type { IFullError } from '../../../../../types';
import { Log } from '../themed';

export const generateMessages = (messages: { time: number; payload: string }[]): JSX.Element[] | JSX.Element => {
  return messages.length === 0 ? (
    <h3>No messages</h3>
  ) : (
    messages.map((m) => {
      const now = new Date(m.time);
      const min = now.getMinutes().toString().length > 1 ? now.getMinutes() : `0${now.getMinutes()}`;
      const hour = now.getHours().toString().length > 1 ? now.getHours() : `0${now.getHours()}`;

      return (
        <Log key={m.time}>
          <h3>
            {`${hour}:${min} `}
            {JSON.stringify(m.payload, null, 2)}
          </h3>
        </Log>
      );
    })
  );
};

export const generateRaw = (
  messages: { time: number; payload: string }[],
  logs: { time: number; payload: IFullError }[],
): JSX.Element[] | JSX.Element => {
  if (messages.length === 0 && logs.length === 0) return <h3>No messages</h3>;

  const sorted = [...messages, ...logs].sort((a, b) => {
    if (a.time > b.time) {
      return 1;
    }
    if (a.time === b.time) {
      return 0;
    }
    return -1;
  });

  return sorted.map((m) => {
    const now = new Date(m.time);
    const min = now.getMinutes().toString().length > 1 ? now.getMinutes() : `0${now.getMinutes()}`;
    const hour = now.getHours().toString().length > 1 ? now.getHours() : `0${now.getHours()}`;

    return (
      <Log key={m.time}>
        <h3>
          {`${hour}:${min} `}
          {JSON.stringify(m.payload, null, 2)}
        </h3>
      </Log>
    );
  });
};
