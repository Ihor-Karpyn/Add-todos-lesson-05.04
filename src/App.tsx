import React, { FC, useState } from 'react';
import { Color, FullGood, GoodWithoutColor } from './types';
import './App.css';
import { GoodsList } from './GoodsList';
import { AddGoodForm } from './AddGoodForm';

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

  const addGood = (colorId: number, name: string) => {
    const newGood = {
      id: Date.now(),
      colorId,
      name,
      color: getColors(colorId),
    };

    setGoods((currentGoods) => ([...currentGoods, newGood]));
  };

  const removeGood = (goodId: number) => {
    setGoods(prev => prev.filter(good => good.id !== goodId));
  };

  const editGood = (goodId: number, name: string, colorId: number) => {
    console.log(colorId);

    setGoods(prev => {
      const findedGood = prev.find(good => good.id === goodId);

      console.log({ findedGood });

      if (!findedGood) {
        return prev;
      }

      const index = prev.findIndex(good => good.id === goodId);
      const editedGood = {
        ...findedGood,
        color: getColors(colorId),
        name,
        colorId,
      };
      const res = [...prev];

      res[index] = editedGood;

      console.log({ editedGood });

      return res;
    });
  };

  return (
    <>
      <AddGoodForm colors={colors} onAdd={addGood} />
      <GoodsList goods={goods} onRemove={removeGood} onEdit={editGood} colors={colors} />
    </>
  );
});
