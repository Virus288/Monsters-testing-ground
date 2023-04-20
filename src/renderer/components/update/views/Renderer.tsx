const renderInnerNotes = (notes: string[]): JSX.Element[] => {
  let x = 0;

  return notes.map((n) => {
    x++;
    return <h2 key={x}>• {n}</h2>;
  });
};

// eslint-disable-next-line import/prefer-default-export
export const RenderNotes = (data: string | undefined): JSX.Element | undefined => {
  if (!data) return undefined;

  const notes = JSON.parse(data) as Record<string, Record<'notes', string[]>>;
  const target = Object.keys(notes)[0];

  return <span>{renderInnerNotes(notes[target].notes)}</span>;
};
