import { type FunctionComponent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 318px;
  height: 414px;

  margin: 24px;
`;

const Image = styled.div`
  margin: 0;
  padding: 0;

  width: 318px;
  height: 318px;

  background: #e7e7e9;
  border-radius: 16px 16px 0px 0px;
`;

const Information = styled.div`
  width: 318px;
  height: 96px;

  background: #fdfdfd;
  border-radius: 0px 0px 16px 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  span {
    width: 286px;
    height: 28px;
    margin-top: 16px;

    font-family: Pretendard;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;

    letter-spacing: 0.015em;

    color: #0f0b1b;
  }

  p {
    width: 286px;
    height: 24px;
    margin-bottom: 16px;

    font-family: Pretendard;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;

    letter-spacing: 0.015em;

    color: #888690;
  }
`;

interface Props {}

export const Item: FunctionComponent<Props> = () => {
  return (
    <Wrapper>
      <Image />
      <Information>
        <span>asdfasdfasdfasdf</span>
        <p>2021.12.25</p>
      </Information>
    </Wrapper>
  );
};

export default Item;
