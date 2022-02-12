import styled from 'styled-components';

const Wrapper = styled.div`
  z-index: 100;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  position: absolute;

  width: 50px;
  padding: 20px;
  right: 50px;
  top: 120px;

  background: #ffffff;
  box-shadow: 0px 1px 30px rgba(0, 0, 0, 0.02);
  border-radius: 12px;

  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const Button = styled.button<{ image: string }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;
  margin: 20px;
  padding: 0;
  border: none;

  /* border: 1px solid #000; */
  border-radius: 5px;

  background-color: transparent;
  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  transition-duration: 0.4s;

  :hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
`;

type Props = {
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuBar = ({ setEditOpen }: Props) => {
  const openEditModal = () => {
    setEditOpen(true);
  };

  return (
    <Wrapper>
      {/* <Button image={'/assets/image/cursor_ico.svg'} /> */}
      {/* <Button image={'/assets/image/hand_ico.svg'} /> */}
      <Button
        onClick={() => {
          openEditModal();
        }}
        image={'/assets/image/postit_ico.svg'}
      />
      <Button image={'/assets/image/sticker_ico.svg'} />
      {/* <Button image={'/assets/image/rotate_ico.svg'} /> */}
      <Button image={'/assets/image/remove_ico.svg'} />
    </Wrapper>
  );
};

export default MenuBar;
