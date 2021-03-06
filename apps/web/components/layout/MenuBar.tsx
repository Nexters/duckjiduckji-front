import { MouseEventHandler, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useWindowSize } from 'react-use';

import { shapesState, backgroundState } from 'web/atoms';
import { changeStageAxis } from 'web/atoms/stageAxis';

import { POSTIT_HEIHT, POSTIT_WIDTH } from 'web/shared/consts';
import { IPostIt } from 'web/shared/types';
import { uploadFile } from '../../shared/utils';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

type Props = {
  isEditOpen: boolean;
  setType: React.Dispatch<React.SetStateAction<'polaroid' | 'postit' | 'sticker'>>;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuBar = ({ isEditOpen, setEditOpen, setType }: Props) => {
  const [shapes, setShapes] = useRecoilState(shapesState);
  const [_, setBackgroundSrc] = useRecoilState(backgroundState);
  const axis = useRecoilValue(changeStageAxis);
  const {
    query: { roomId },
  } = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { width, height } = useWindowSize();

  const openEditModal = () => {
    setEditOpen(true);
  };

  const closeEditModal = () => {
    setEditOpen(false);
  };

  const polaroidButtonHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (isEditOpen) {
      setType(undefined);
      closeEditModal();
    } else {
      setType('polaroid');
      openEditModal();
    }
  };

  const postitButtonHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (isEditOpen) {
      setType(undefined);
      closeEditModal();
    } else {
      setType('postit');
      openEditModal();
    }
  };

  const stickerButtonHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (isEditOpen) {
      setType(undefined);
      closeEditModal();
    } else {
      setType('sticker');
      openEditModal();
    }
  };

  const createPostIt = () => {
    const { postIts } = shapes;

    const lastIdx = postIts.length - 1;
    const { y, x } = axis || { y: 0, x: 0 };
    // console.log(axis);

    const newPostIt: IPostIt = {
      type: 'postIt',
      id: `i${lastIdx + 1}`,
      x: -x + Math.ceil(width / 2 - POSTIT_WIDTH / 2),
      y: -y + Math.ceil(height / 2 - POSTIT_HEIHT / 2),
      rotation: 0,
      isDragging: false,
    };
    const newPostIts = [...shapes.postIts, newPostIt];

    setShapes({ ...shapes, postIts: newPostIts });
  };

  async function handleFileUpload(files) {
    if (!files.length) return;
    const file = files[0];
    const uploadResult = await uploadFile(file, String(roomId));
    if (!uploadResult) toast.error('????????? ???????????? ??????????????????.');
    setBackgroundSrc(uploadResult.body.img_url);
  }

  return (
    <>
      <Wrapper>
        <ObjectButton onClick={() => fileInputRef.current.click()} image={'/assets/image/background.png'} />
        <ObjectButton onClick={polaroidButtonHandler} image={'/assets/image/polaroidcreate.png'} />
        <ObjectButton onClick={stickerButtonHandler} image={'/assets/image/stickercreate.png'} />
        <Button onClick={postitButtonHandler} image={'/assets/image/postit_ico.svg'} />
      </Wrapper>
      <input
        ref={fileInputRef}
        onChange={({ target }) => {
          handleFileUpload(target.files);
          target.value = null;
        }}
        type="file"
        accept="image/*"
        style={{ opacity: 0, position: 'fixed' }}
      />
    </>
  );
};

export default MenuBar;

const Wrapper = styled.div`
  z-index: 100;

  display: flex;
  border-radius: 25px 25px 0px 0px;
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
  cursor: pointer;
  background: #ffffff;

  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;
