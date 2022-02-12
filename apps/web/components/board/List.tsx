import { MouseEventHandler, useState } from 'react';
import styled from 'styled-components';

import { Items } from './Items';
import { CreateBoardModal } from './CreateBoardModal';

export function List() {
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggleHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setOpen(!isOpen);
  };

  return (
    <Wrapper>
      {isOpen && <CreateBoardModal setOpen={setOpen} />}
      <CreateButton onClick={toggleHandler}>+</CreateButton>
      <Menu>
        <section>
          <Text>All Boards</Text>
        </section>
        <section>
          <TrashButton>삭제</TrashButton>
        </section>
      </Menu>
      <Items />
    </Wrapper>
  );
}

export default List;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;

  background: #f3f3f4;
`;

const Menu = styled.div`
  margin-top: 90px;

  width: 100vw;
  /* height: 96px; */
  padding: 28px 0;

  display: flex;
  flex-direction: rows;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid #b8b7bc;

  section {
    margin: 0 48px;
  }
`;

const Text = styled.p`
  width: 154px;
  height: 40px;

  font-family: Pretendard;
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 40px;

  letter-spacing: 0.015em;

  color: #0f0b1b;
`;

const TrashButton = styled.button`
  width: 40px;
  height: 40px;
`;

const CreateButton = styled.button`
  z-index: 100;
  position: absolute;
  width: 56px;
  height: 56px;
  right: 48px;
  bottom: 48px;

  border: none;
  border-radius: 48px;

  background: #6038ff;
  box-shadow: 0px 0px 10px rgba(218, 218, 218, 0.1);

  color: #ffffff;
  font-size: 40px;
  line-height: 40px;

  transition-duration: 0.4s;
  &:hover {
    background: #3e1fbb;
  }
`;
