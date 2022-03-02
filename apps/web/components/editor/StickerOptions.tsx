import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useWindowSize } from 'react-use';
import styled from 'styled-components';

import { ISticker } from 'web/shared/types';
import { shapesState, initData, socketApiSelector } from 'web/atoms';
import { changeStageAxis } from 'web/atoms/stageAxis';

import { CreatePoster, MESSAGE_TYPE, CONTENT_TYPE } from 'socket-model';
import { useRouter } from 'next/router';

type Props = {
  close: () => void;
};

const STICKER_WIDTH = 80;
const STICKER_HEIGHT = 80;

export const StickerOptions = ({ close }: Props) => {
  const [shapes, setShapes] = useRecoilState(shapesState);
  const [_, setInit] = useRecoilState(initData);
  const socketApi = useRecoilValue(socketApiSelector);
  const axis = useRecoilValue(changeStageAxis);
  const router = useRouter();

  const { width, height } = useWindowSize();

  useEffect(() => {
    return () => {};
  }, []);

  const sendSocket = () => {
    if (!socketApi.sendRoom) {
      throw new Error(`SOCKET NOT CONNECTED`);
    }
  };

  const createSticker = (imageURL: string) => {
    const { y, x } = axis || { y: 0, x: 0 };
    const { stickers } = shapes;
    const lastIdx = stickers.length - 1;

    const newSticker: ISticker = {
      type: 'sticker',
      id: `sticker-${lastIdx + 1}`,
      x: -x + Math.ceil(width / 2 - STICKER_WIDTH / 2),
      y: -y + Math.ceil(height / 2 - STICKER_HEIGHT / 2),
      rotation: 0,
      isDragging: false,
      imageURL,
    };

    const newStickers = [...shapes.stickers, newSticker];
    setShapes({ ...shapes, stickers: newStickers });
  };

  const createHandler = (image: string) => {
    createSticker(image);
    close();
  };

  const stickerImages = [
    '/assets/image/stickers/1_Sticker.png',
    '/assets/image/stickers/2_Sticker.png',
    '/assets/image/stickers/3_Sticker.png',
    '/assets/image/stickers/4_Sticker.png',
    '/assets/image/stickers/5_Sticker.png',
    '/assets/image/stickers/character.png',
  ];

  return (
    <Wrapper>
      <Section>
        <UnorderedList>
          {stickerImages.map(image => {
            return (
              <Sticker
                key={image}
                image={image}
                onClick={() => {
                  createHandler(image);
                }}
              />
            );
          })}
        </UnorderedList>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 678px;
  height: 160px;
  left: 0px;

  border-radius: 25px;

  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: space-between;
`;

const UnorderedList = styled.ul`
  display: flex;
  flex-wrap: rows;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 16px 36px;

  width: 100px;
  height: 48px;

  background: #424242;
  color: #ffffff;
  border-radius: 8px;

  font-family: SpoqaHanSans;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;

  text-align: center;
  letter-spacing: 0.015em;

  transition-duration: 0.4s;
  &:hover {
    background: #5f5f5f;
  }
`;

const DivideLine = styled.div`
  height: 112px;
  width: 0;
  border-right: 1px solid #e7e7e9;
`;

const Sticker = styled.div<{ image: string }>`
  width: 80px;
  height: 80px;
  margin: 21px;

  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  background-size: contain;
`;
