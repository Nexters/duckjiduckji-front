import { type FunctionComponent } from 'react';
import styled from 'styled-components';

import { Item } from './Item';

import { RoomData } from 'web/shared/types';

const Wrapper = styled.div`
  width: 100vw;
  /* height: 500px; */

  display: flex;
  flex-wrap: wrap;

  overflow-y: auto;
`;

interface Props {}

interface RoomInformation {
  backgroundImage: string;
  createdAt: string;
  id: string;
  title: string;
}

const dummys: RoomInformation[] = [
  {
    backgroundImage: '',
    createdAt: '2022-02-19T15:00:41.275',
    id: '621087899b66413001f57afe',
    title: 'dummy title',
  },
];

export const Items: FunctionComponent<Props> = () => {
  const list: RoomInformation[] = dummys;

  return (
    <Wrapper>
      {list.map((cur, index) => {
        return <Item key={index} title={cur.title} id={cur.id} createdAt={cur.createdAt} backgroundImage={''} />;
      })}
    </Wrapper>
  );
};

export default Items;
