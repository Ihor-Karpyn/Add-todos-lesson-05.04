import React, { FC, useState } from 'react';
import { Color, FullGood, GoodWithoutColor } from './types';

const colors: Color[] = [
  { id: 1, name: 'red' },
  { id: 2, name: 'green' },
  { id: 3, name: 'blue' },
];

const goodsFromServer: GoodWithoutColor[] = [
  { id: 1, colorId: 1, name: 'Dumplings' },
  { id: 2, colorId: 2, name: 'Carrot' },
  { id: 3, colorId: 3, name: 'Eggs' },
  { id: 4, colorId: 1, name: 'Ice cream' },
  { id: 5, colorId: 2, name: 'Apple' },
  { id: 6, colorId: 3, name: 'Bread' },
  { id: 7, colorId: 1, name: 'Fish' },
  { id: 8, colorId: 2, name: 'Honey' },
  { id: 9, colorId: 3, name: 'Jam' },
  { id: 10, colorId: 1, name: 'Garlic' },
];

const getColors = (colorId: number) => (
  colors.find(color => color.id === colorId)
);

const preparedGoods: FullGood[] = goodsFromServer.map(good => ({
  ...good,
  color: getColors(good.colorId),
}));

export const App: FC = React.memo(() => {
  const [goods, setGoods] = useState(preparedGoods);
  const [selectedColorId, setSelectedColorId] = useState(0);
  const [selectedName, setSelectedName] = useState('');

  const addGood = (colorId: number, name: string) => {
    const newGood = {
      id: Date.now(),
      colorId,
      name,
      color: getColors(colorId),
    };

    setGoods((currentGoods) => ([...currentGoods, newGood]));
  };

  const resetForm = () => {
    setSelectedColorId(0);
    setSelectedName('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addGood(selectedColorId, selectedName);

    resetForm();
  };

  return (
    <>
      <form onSubmit={e => handleSubmit(e)}>
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
            <option value={id}>{name}</option>
          ))}
        </select>
        <button type="submit">Add good</button>
      </form>
      <ul>
        {goods.map(good => (
          <li key={good.id} style={{ color: good.color?.name }}>
            {good.name}
          </li>
        ))}
      </ul>
    </>
  );
});
