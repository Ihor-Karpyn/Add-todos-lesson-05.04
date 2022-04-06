import React, { FC } from 'react';
import { FullGood } from './types';

interface Props {
  goods: FullGood[];
}

export const GoodsList: FC<Props> = React.memo(({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <li key={good.id} style={{ color: good.color?.name }}>
          {good.name}
        </li>
      ))}
    </ul>
  );
});
