import React, { FC, useState } from 'react';
import { Color } from './types';

interface Props {
  colors: Color[];
  onAdd: (colorId: number, name: string) => void;
}

export const AddGoodForm: FC<Props> = React.memo(({
  onAdd, colors,
}) => {
  const [selectedColorId, setSelectedColorId] = useState(0);
  const [selectedName, setSelectedName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);
  const [hasColorError, setHasColorError] = useState(false);

  const resetForm = () => {
    setSelectedColorId(0);
    setSelectedName('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setHasNameError(!selectedName);
    setHasColorError(!selectedColorId);

    if (!selectedName || !selectedColorId) {
      return;
    }

    onAdd(selectedColorId, selectedName);

    resetForm();
  };

  const changeNameHandler = (value: string) => {
    const s = value[value.length - 1];

    if (!Number.isNaN(parseFloat(s))) {
      return;
    }

    setSelectedName(value);
    setHasNameError(false);
  };

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className="wrapper">
        <input
          type="text"
          placeholder="Enter name"
          value={selectedName}
          onChange={e => changeNameHandler(e.target.value)}
        />
        {hasNameError && (
          <span className="error">Add name</span>
        )}
      </div>
      <div className="wrapper">
        <select
          onChange={e => {
            setSelectedColorId(+e.target.value);
            setHasColorError(false);
          }}
          value={selectedColorId}
        >
          <option value="0" disabled selected>Select color</option>
          {colors.map(({ id, name }) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
        {hasColorError && (
          <span className="error">Select color</span>
        )}
      </div>
      <button type="submit">Add good</button>
    </form>
  );
});
