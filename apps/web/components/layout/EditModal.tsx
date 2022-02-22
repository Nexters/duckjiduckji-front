import styled from 'styled-components';

import { Polaroid } from '../editor/PolaroidHTML';
import { Options } from '../editor/Options';
import { PostItOptions } from '../editor/PostItOptions';

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
  type: 'postit' | 'polaroid';
};

export const EditModal = ({ setEditOpen, type }: Props) => {
  const closeModal = () => {
    setEditOpen(false);
  };

  return (
    <Wrapper>
      {type === 'polaroid' && <Options close={closeModal} />}
      {type === 'postit' && <PostItOptions close={closeModal} />}
    </Wrapper>
  );
};

export default EditModal;
