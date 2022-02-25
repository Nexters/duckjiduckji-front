import { useRecoilState, useRecoilValue } from 'recoil';
import { useWindowSize } from 'react-use';
import styled from 'styled-components';

import { changePostIt } from '../../atoms/create';
import { shapesState, initData, socketApiSelector } from 'web/atoms';
import { changeStageAxis } from 'web/atoms/stageAxis';

import { POSTIT_HEIHT, POSTIT_WIDTH } from 'web/shared/consts';
import { IPostIt } from 'web/shared/types';
import { useEffect } from 'react';
import { CreatePoster, MESSAGE_TYPE, CONTENT_TYPE } from 'socket-model';
import { useRouter } from 'next/router';

const colors: string[] = [
  '#FFFFFF',
  '#000000',
  '#6A67FF',
  '#5BB0FF',
  '#00DE74',
  '#FFF61C',
  '#FFBB55 ',
  '#FF8E6A',
  '#FF627E',
  '#CD34E2',
];

type Props = {
  close: () => void;
};

export const PostItOptions = ({ close }: Props) => {
  const [shapes, setShapes] = useRecoilState(shapesState);
  const [_, setInit] = useRecoilState(initData);
  const socketApi = useRecoilValue(socketApiSelector);
  const axis = useRecoilValue(changeStageAxis);
  const router = useRouter();

  const { width, height } = useWindowSize();
  const [postItData, setPostItData] = useRecoilState(changePostIt);

  useEffect(() => {
    const newData = { ...postItData, type: 'postit' };
    setPostItData(newData);

    return () => {
      setPostItData({
        type: null,
        color: null,
        text: null,
      });
    };
  }, []);

  const changeColorHandler = (color: string) => {
    const newData = {
      ...postItData,
      color: color,
    };
    setPostItData(newData);
  };

  const createPostIt = () => {
    if (!socketApi.sendRoom) {
      throw new Error(`SOCKET NOT CONNECTED`);
    }

    const { postIts } = shapes;

    const lastIdx = postIts.length - 1;
    const { y, x } = axis || { y: 0, x: 0 };

    const newPostIt: IPostIt = {
      type: 'postIt',
      id: `i${lastIdx + 1}`,
      x: -x + Math.ceil(width / 2 - POSTIT_WIDTH / 2),
      y: -y + Math.ceil(height / 2 - POSTIT_HEIHT / 2),
      rotation: 0,
      isDragging: false,
      color: postItData.color,
      text: postItData.text,
    };

    // TODO: user 데이터 추가
    const message: CreatePoster = {
      msgType: MESSAGE_TYPE.CREATE,
      userId: 'user123',
      roomId: `${router.query.roomId}`,
      contentId: newPostIt.id,
      contentType: CONTENT_TYPE.postIt,
      data: {
        content: newPostIt.text,
        color: newPostIt.color,
        width: POSTIT_WIDTH,
        height: POSTIT_HEIHT,
        rotation: newPostIt.rotation,
        point: {
          x: newPostIt.x,
          y: newPostIt.y,
        },
      },
    };
    socketApi.sendRoom(message);

    const newPostIts = [...shapes.postIts, newPostIt];
    setInit(undefined);
    setShapes({ ...shapes, postIts: newPostIts });
  };

  const createHandler = () => {
    createPostIt();
    close();
  };

  return (
    <Wrapper>
      <Section>
        <ColorUnorderedList>
          {colors.map(color => {
            return (
              <ColorList
                onClick={() => {
                  changeColorHandler(color);
                }}
                key={color}
                color={color}
              />
            );
          })}
        </ColorUnorderedList>
      </Section>
      <Button onClick={createHandler}>완료</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 888px;
  height: 160px;
  left: 0px;

  border-top-left-radius: 25px;
  border-top-right-radius: 25px;

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

const ColorUnorderedList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  width: 300px;
`;

const ColorList = styled.li<{ color: string }>`
  margin: 4px;
  width: 50px;
  height: 50px;

  border: 1px solid #f3f3f4;
  box-sizing: border-box;
  border-radius: 2px;

  background: ${props => props.color || `#d1d1d1`};
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

const DesignUnorderedList = styled.div`
  display: flex;
  flex-direction: row;
`;

const PolaroidButton = styled.div<{ color: string }>`
  width: 65px;
  height: 112px;
  margin: 8px;

  background-color: ${props => props.color};
`;

const DivideLine = styled.div`
  height: 112px;
  width: 0;
  border-right: 1px solid #e7e7e9;
`;
