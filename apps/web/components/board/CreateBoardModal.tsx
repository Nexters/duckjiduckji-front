import { ChangeEventHandler, useEffect } from 'react';
import { useState, useRef, MouseEventHandler, type FunctionComponent } from 'react';
import styled from 'styled-components';

import { requestCreateBoard } from '../../fetch/createBoard';

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const checkValid = (title: string) => {
  return title.length <= 20;
};

export const CreateBoardModal: FunctionComponent<Props> = ({ setOpen }) => {
  const inputRef = useRef<HTMLInputElement>();

  const [isActive, setActive] = useState<boolean>(false);
  const [isFail, setFail] = useState<boolean>(false);

  const closeModal: MouseEventHandler<HTMLButtonElement> = () => {
    setOpen(false);
  };

  const onType: ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.target;

    if (!checkValid(value)) {
      setFail(true);
      setActive(false);
      return;
    }

    if (value.length > 0) setActive(true);
    setFail(false);
  };

  const createBoard: MouseEventHandler<HTMLButtonElement> = async () => {
    const { value } = inputRef.current;

    if (!checkValid(value)) return;

    const response = await requestCreateBoard(`${value}`);
    if (!response) {
      console.log('error');
      return;
    }

    const { title } = response;

    location.href = `/rooms/${title}`;
  };

  return (
    <Wrapper>
      <EditContainer>
        <CloseButton onClick={closeModal}>✕</CloseButton>
        <Information>보드 이름을 설정해 주세요</Information>
        <Input
          ref={inputRef}
          onChange={onType}
          className={(isActive && 'active') || (isFail && 'fail')}
          type="text"
        ></Input>
        {isFail && <Warn>20자 이하로 입력해주세요</Warn>}
        <ConfirmButton onClick={createBoard} className={isActive && 'active'}>
          완료
        </ConfirmButton>
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
  /* justify-content: center; */
  align-items: center;

  background: #ffffff;
  border-radius: 10px;
`;

const Information = styled.span`
  width: 360px;
  height: 36px;
  position: absolute;
  top: 80px;

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

  margin-top: 180px;

  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 28px;

  letter-spacing: 0.015em;

  color: #a09fa6;

  border-bottom: 2px solid #a09fa6;

  &.active {
    border-bottom: 2px solid #6038ff;
  }

  &.fail {
    border-bottom: 2px solid #fe2626;
  }
`;

const ConfirmButton = styled.button`
  width: 380px;
  height: 64px;

  position: absolute;
  bottom: 40px;

  border: none;

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

  &.fail {
    background: #fe2626;
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

const Warn = styled.p`
  width: 380px;
  height: 24px;

  margin-top: 12px;

  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;

  letter-spacing: 0.015em;

  color: #fe2626;
`;
