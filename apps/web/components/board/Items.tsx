import { type FunctionComponent } from 'react';
import styled from 'styled-components';

import { Item } from './Item';

const Wrapper = styled.div`
  width: 100vw;
  /* height: 500px; */

  display: flex;
  flex-wrap: wrap;

  overflow-y: auto;
`;

interface Props {}

export const Items: FunctionComponent<Props> = () => {
  const list = [1, 2, 3, 4];

  return (
    <Wrapper>
      {list.map((cur, index) => {
        return <Item key={index} />;
      })}
    </Wrapper>
  );
};

export default Items;
