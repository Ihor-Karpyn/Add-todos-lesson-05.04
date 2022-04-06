import React, { FC, useState } from 'react';
import { Color, FullGood } from './types';

interface Props {
  goods: FullGood[];
  onRemove: (goodId: number) => void;
  onEdit: (goodId: number, name: string, colorId: number) => void;
  colors: Color[];
}

export const GoodsList: FC<Props> = React.memo(({
  goods, onRemove, colors, onEdit,
}) => {
  const [selectedGoodId, setSelectedGoodId] = useState(0);
  const [selectedColorId, setSelectedColorId] = useState(0);
  const [selectedName, setSelectedName] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEdit(selectedGoodId, selectedName, selectedColorId);
    setSelectedName('');
    setSelectedColorId(0);
    setSelectedGoodId(0);
  };

  return (
    <ul>
      {goods.map(good => (
        <React.Fragment key={good.id}>
          {selectedGoodId === good.id
            ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={selectedName}
                  onChange={e => setSelectedName(e.target.value)}
                />
                <select
                  onChange={e => setSelectedColorId(+e.target.value)}
                  value={selectedColorId}
                >
                  <option value="0" disabled selected>Select color</option>
                  {colors.map(({ id, name }) => (
                    <option key={id} value={id}>{name}</option>
                  ))}
                </select>
                <button type="submit">Edit</button>
              </form>
            )
            : (
              <li
                style={{ color: good.color?.name }}
                onDoubleClick={() => onRemove(good.id)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setSelectedGoodId(good.id);
                  setSelectedName(good.name);
                  setSelectedColorId(good.colorId);
                }}
              >
                {good.name}
              </li>
            )}
        </React.Fragment>
      ))}
    </ul>
  );
});
