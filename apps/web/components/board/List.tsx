import styled from "styled-components";

import { Items } from "./Items";

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

export function List() {
  return (
    <Wrapper>
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
