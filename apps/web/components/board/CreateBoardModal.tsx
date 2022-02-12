import { useState, useRef, MouseEventHandler, type FunctionComponent } from 'react';
import styled from 'styled-components';

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateBoardModal: FunctionComponent<Props> = ({ setOpen }) => {
  const inputRef = useRef<HTMLInputElement>();

  const [isActive, setActive] = useState<boolean>(false);

  const closeModal: MouseEventHandler<HTMLButtonElement> = () => {
    setOpen(false);
  };

  const createBoard = () => {
    console.log(inputRef.current.value);
  };

  return (
    <Wrapper>
      <EditContainer>
        <CloseButton onClick={closeModal}>✕</CloseButton>
        <Information>보드 이름을 설정해 주세요</Information>
        <Input ref={inputRef} type="text"></Input>
        <ConfirmButton className={true && 'active'}>완료</ConfirmButton>
      </EditContainer>
    </Wrapper>
  );
};

export default CreateBoardModal;

const Wrapper = styled.div`
  z-index: 200;
  position: absolute;
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(15, 11, 27, 0.8);
`;

const EditContainer = styled.div`
  position: relative;
  width: 480px;
  height: 424px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #ffffff;
  border-radius: 10px;
`;

const Information = styled.span`
  width: 360px;
  height: 36px;

  margin-top: 80px;

  font-family: Pretendard;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;

  text-align: center;
  letter-spacing: 0.015em;

  color: #413e4d;

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 10px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 380px;
  height: 52px;

  margin-top: 64px;

  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 28px;

  letter-spacing: 0.015em;

  color: #a09fa6;

  border-bottom: 2px solid #a09fa6; ;
`;

const ConfirmButton = styled.button`
  width: 380px;
  height: 64px;

  border: none;

  margin-top: 86px;

  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;

  text-align: center;
  letter-spacing: 0.015em;

  color: #ffffff;

  background: #d0cfd3;
  border-radius: 32px;

  &.active {
    background: #6038ff;
  }
`;

const CloseButton = styled.button`
  width: 20px;
  height: 20px;
  position: absolute;

  border: none;
  padding: 0;

  right: 26px;
  top: 26px;

  background-color: #ffffff;

  font-size: 20px;
  line-height: 20px;
`;
