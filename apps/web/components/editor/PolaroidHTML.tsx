import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;

  top: 150px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 306px;
  height: 528px;

  background-color: #c9c9c9;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const Photo = styled.img`
  margin: 33px 33px 0 33px;
  padding: 0;

  border: none;

  width: 240px;
  height: 360px;

  background-color: #e4e4e4;
`;

const Text = styled.section`
  margin: 16px 31px 23px 31px;
  padding: 0;

  border: none;

  width: 244px;
  height: 96px;

  background-color: #e4e4e4;

  input {
    text-align: center;
    width: 216px;
    height: 70px;

    margin: 14px 13px;
    padding: 0;
    border: none;

    font-family: Pretendard;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 16px;

    /* GRAY_4 */

    color: #b8b7bc;

    :focus {
      outline: none;
    }
  }
`;

export const Polaroid = () => {
  return (
    <Wrapper>
      <Photo />
      <Text>
        <input placeholder="내용을 입력해주세요!" />
      </Text>
    </Wrapper>
  );
};

export default Polaroid;
