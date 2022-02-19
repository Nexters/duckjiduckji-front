import styled from 'styled-components';

import { Polaroid } from '../editor/PolaroidHTML';
import { Options } from '../editor/Options';

const Wrapper = styled.div`
  z-index: 100;

  display: flex;

  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 190px;

  width: 888px;
  left: calc((100vw - 888px) / 2);
  height: 170px;
`;

type Props = {
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditModal = ({ setEditOpen }: Props) => {
  const closeModal = () => {
    setEditOpen(false);
  };

  return (
    <Wrapper>
      <Options close={closeModal} />
    </Wrapper>
  );
};

export default EditModal;
