import { useEffect, useState, type FunctionComponent } from 'react';
import styled from 'styled-components';

import { Item } from './Item';

import { requestGetAllRooms } from 'web/fetch/getAllRooms';

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

export const Items: FunctionComponent<Props> = () => {
  const [list, setList] = useState<RoomInformation[]>([]);

  useEffect(() => {
    requestGetAllRooms().then(response => {
      if (!response) return;

      const { contents } = response;

      const newList: RoomInformation[] = contents.map(content => {
        return {
          backgroundImage: content.background?.image || '',
          createdAt: content.createdAt,
          id: content.id,
          title: content.title || 'undefined title',
        };
      });

      setList(newList);
    });
  }, []);

  return (
    <Wrapper>
      {list.map((cur, index) => {
        return <Item key={index} title={cur.title} id={cur.id} createdAt={cur.createdAt} backgroundImage={''} />;
      })}
    </Wrapper>
  );
};

export default Items;
