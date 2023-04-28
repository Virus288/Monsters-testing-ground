// eslint-disable-next-line import/prefer-default-export
export const generateAvailableUsers = (users: string[]): JSX.Element[] => {
  return users.map((u) => {
    return (
      <option key={u} value={u}>
        {u}
      </option>
    );
  });
};
