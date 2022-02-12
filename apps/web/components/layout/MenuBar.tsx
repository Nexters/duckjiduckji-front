import { MouseEventHandler } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  z-index: 100;

  display: flex;

  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 0px;

  width: 888px;
  left: calc((100vw - 888px) / 2);
  height: 170px;

  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
`;

const Button = styled.button<{ image: string }>`
  width: 84px;
  height: 84px;
  margin: 16px;
  padding: 0;

  border: 2px solid #f3f3f4;
  border-radius: 84px;

  background: #ffffff;

  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  background-size: 50%;
  background-position: center;

  transition-duration: 0.4s;

  :hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
`;

const ObjectButton = styled.button<{ image: string }>`
  width: 140px;
  height: 140px;
  padding: 0;
  border: none;

  background: #ffffff;

  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

type Props = {
  isEditOpen: boolean;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuBar = ({ isEditOpen, setEditOpen }: Props) => {
  const openEditModal = () => {
    setEditOpen(true);
  };

  const closeEditModal = () => {
    setEditOpen(false);
  };

  const onClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (isEditOpen) {
      closeEditModal();
    } else {
      openEditModal();
    }
  };

  return (
    <Wrapper>
      <ObjectButton onClick={onClickHandler} image={'/assets/image/polaroid_ico.png'} />
      <ObjectButton image={'/assets/image/sticker_ico.png'} />
      <Button image={'/assets/image/postit_ico.svg'} />
      <Button image={'/assets/image/remove_ico.svg'} />
    </Wrapper>
  );
};

export default MenuBar;
