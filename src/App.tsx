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

  return (
    <>
      <ul>
        {goods.map(good => (
          <li style={{ color: good.color?.name }}>
            {good.name}
          </li>
        ))}
      </ul>
    </>
  );
});
