import { useEffect, useRef, useState } from 'react';
import { Rect, Group, Text, Line, Transformer } from 'react-konva';
import { IPolaroid } from 'web/shared/types';
import {
  CROSS_LINE_STROKE_SIZE,
  CROSS_LINE_WIDTH,
  CROSS_LINE_Y,
  FONT_SIZE,
  GAP_HEIGHT,
  INNER_CORNER_RADIUS,
  OUTER_CORNER_RADIUS,
  PADDING,
  PHOTO_INPUT_GUIDE_X,
  PHOTO_INPUT_GUIDE_Y,
  POLAROID_BORDER_WIDTH,
  POLAROID_CLIENT_HEIGHT,
  POLAROID_CLIENT_WIDTH,
  POLAROID_LOWER_CLIENT_HEIGHT,
  POLAROID_OFFSET_HEIGHT,
  POLAROID_OFFSET_WIDTH,
  POLAROID_UPPER_CLIENT_HEIGHT,
  POSTIT_HEIHT,
  POSTIT_WIDTH,
} from 'web/shared/consts';
import { KonvaEventObject } from 'konva/lib/Node';
import { URLImage } from '.';
import { CSSProperties } from 'styled-components';
import { Html } from 'react-konva-utils';
import { useRecoilValue } from 'recoil';
import { socketApiSelector } from '../../../atoms';
import { CONTENT_TYPE, CreatePoster, MESSAGE_TYPE, SocketApi } from 'socket-model';
import { useRouter } from 'next/router';

type Props = {
  polaroid: IPolaroid;
  isDraggable: boolean;
  isSelected: boolean;
  onClick: (e: KonvaEventObject<MouseEvent>, id: IPolaroid) => void;
  onSelect: (polaroid: IPolaroid) => void;
  onChange: (polaroid: IPolaroid) => void;
  onImageUploadClick: (polaroid: IPolaroid) => void;
  onPolaroidTextChange: (text: string) => void;
  socketApi: SocketApi;
  roomId: string;
  color?: string;
};

export function Polaroid({
  polaroid,
  isDraggable,
  isSelected,
  onSelect,
  onChange,
  onImageUploadClick,
  onPolaroidTextChange,
  socketApi,
  roomId,
  onClick,
}: Props) {
  const [isImageShown, setIsImageShown] = useState(false);
  const shapeRef = useRef(null);
  const trRef = useRef(null);
  const textAreaRef = useRef(null);
  const [toggleText, setToggleText] = useState(true);

  const setPolaroidText = () => {
    onPolaroidTextChange(textAreaRef.current.value);
  };

  useEffect(() => {
    if (!isSelected) return;
    trRef.current.nodes([shapeRef.current]);
    trRef.current.getLayer().batchDraw();
  }, [isSelected]);

  const updatePolaroid = () => {
    if (!socketApi.sendRoom) {
      return;
    }

    const images = polaroid.imgUrl ? [{ link: polaroid.imgUrl, order: 1 }] : [];
    const message: CreatePoster = {
      msgType: MESSAGE_TYPE.UPDATE,
      userId: window.localStorage.getItem('userId'),
      roomId,
      contentId: polaroid.id,
      contentType: CONTENT_TYPE.polaroid,
      data: {
        content: polaroid.text,
        width: POSTIT_WIDTH,
        height: POSTIT_HEIHT,
        images,
        rotation: polaroid.rotation,
        point: {
          x: polaroid.x,
          y: polaroid.y,
        },
        opacity: null,
        font: null,
        background: {
          image: null,
          color: polaroid.color,
        },
      },
    };
    socketApi.sendRoom(message);
  };

  useEffect(() => {
    if (!polaroid.imgUrl) return;
    updatePolaroid();
  }, [polaroid.imgUrl]);

  function handleTransformEnd() {
    const node = shapeRef.current;

    onChange({
      ...polaroid,
      x: node.x(),
      y: node.y(),
      rotation: node.rotation(),
    });
  }
  return (
    <>
      <Group
        id={polaroid.id}
        x={polaroid.x}
        y={polaroid.y}
        width={POLAROID_OFFSET_WIDTH}
        height={POLAROID_OFFSET_HEIGHT}
        rotation={polaroid.rotation}
        ref={shapeRef}
        onClick={e => {
          onClick(e, polaroid);
          onSelect(polaroid);
        }}
        onTap={() => onSelect(polaroid)}
        onTransformEnd={handleTransformEnd}
        draggable={isDraggable}
        onDragStart={() => onSelect(polaroid)}
        onDragEnd={e => {
          onChange({ ...polaroid, x: e.target.x(), y: e.target.y() });
        }}
      >
        <Rect
          width={POLAROID_OFFSET_WIDTH}
          height={POLAROID_OFFSET_HEIGHT}
          cornerRadius={OUTER_CORNER_RADIUS}
          fill={polaroid.color || '#5BB0FF'}
          opacity={1}
          shadowColor="black"
          shadowBlur={10}
          shadowOpacity={0.6}
          shadowOffsetX={polaroid.isDragging ? 10 : 5}
          shadowOffsetY={polaroid.isDragging ? 10 : 5}
        />
        <Group onClick={() => onImageUploadClick(polaroid)} onTouchEnd={() => setIsImageShown(true)}>
          <Rect
            x={POLAROID_BORDER_WIDTH}
            y={POLAROID_BORDER_WIDTH}
            width={POLAROID_CLIENT_WIDTH}
            height={POLAROID_UPPER_CLIENT_HEIGHT}
            fill="white"
          />

          {polaroid.imgUrl ? (
            <URLImage
              isFitWidth={true}
              src={polaroid.imgUrl}
              x={POLAROID_BORDER_WIDTH}
              y={POLAROID_BORDER_WIDTH}
              width={POLAROID_CLIENT_WIDTH}
              height={POLAROID_UPPER_CLIENT_HEIGHT}
            />
          ) : (
            <>
              <Line
                points={[
                  POLAROID_OFFSET_WIDTH / 2 - CROSS_LINE_WIDTH / 2,
                  CROSS_LINE_Y,
                  POLAROID_OFFSET_WIDTH / 2 + CROSS_LINE_WIDTH / 2,
                  CROSS_LINE_Y,
                ]}
                stroke="#716E7A"
                strokeWidth={CROSS_LINE_STROKE_SIZE}
              />
              <Line
                points={[
                  POLAROID_OFFSET_WIDTH / 2,
                  CROSS_LINE_Y - CROSS_LINE_WIDTH / 2,
                  POLAROID_OFFSET_WIDTH / 2,
                  CROSS_LINE_Y + CROSS_LINE_WIDTH / 2,
                ]}
                stroke="#716E7A"
                strokeWidth={CROSS_LINE_STROKE_SIZE}
              />
              <Text
                text="사진을 넣어주세요!"
                x={PHOTO_INPUT_GUIDE_X}
                y={PHOTO_INPUT_GUIDE_Y}
                fontSize={FONT_SIZE}
                fontFamily="Pretendard"
                fill="#B8B7BC"
              />
            </>
          )}
        </Group>
        <Group
          id={polaroid.id}
          onDblClick={() => {
            textAreaRef.current.focus();
            setToggleText(!toggleText);
          }}
        >
          <Rect
            x={POLAROID_BORDER_WIDTH}
            y={POLAROID_BORDER_WIDTH + POLAROID_UPPER_CLIENT_HEIGHT + GAP_HEIGHT}
            width={POLAROID_CLIENT_WIDTH}
            height={POLAROID_LOWER_CLIENT_HEIGHT}
            cornerRadius={INNER_CORNER_RADIUS}
            fill="white"
          />
          {toggleText && (
            <Text
              text={polaroid.text || '내용을 입력해주세요!'}
              x={POLAROID_BORDER_WIDTH + PADDING}
              y={POLAROID_BORDER_WIDTH + POLAROID_UPPER_CLIENT_HEIGHT + GAP_HEIGHT + PADDING}
              fontFamily="Pretendard"
              fontSize={FONT_SIZE}
              fill={polaroid.text ? '#413E4D' : '#B8B7BC'}
            />
          )}

          <Html
            groupProps={{
              x: POLAROID_BORDER_WIDTH + PADDING,
              y: POLAROID_BORDER_WIDTH + POLAROID_UPPER_CLIENT_HEIGHT + GAP_HEIGHT + PADDING,
            }}
            divProps={{ style: { opacity: toggleText ? 0 : 1 } }}
          >
            <textarea
              spellCheck={false}
              ref={textAreaRef}
              style={textAreaStyle}
              onFocus={() => {
                setToggleText(false);
                onSelect(polaroid);
              }}
              onBlur={() => {
                setToggleText(true);
                setPolaroidText();
                updatePolaroid();
              }}
              onChange={setPolaroidText}
            />
          </Html>
        </Group>
      </Group>
      {isSelected && (
        <Transformer ref={trRef} resizeEnabled={false} centeredScaling={true} rotationSnaps={[0, 90, 180, 270]} />
      )}
    </>
  );
}

const textAreaStyle: CSSProperties = {
  background: 'transparent',
  resize: 'none',
  border: 'none',
  padding: '0',
  width: `${POLAROID_CLIENT_WIDTH - 2 * PADDING}px`,
  fontSize: `${FONT_SIZE}px`,
  outline: 'none',
  height: `${POLAROID_CLIENT_HEIGHT - 2 * PADDING}px`,
  position: 'absolute',
  fontFamily: 'Pretendard',
  lineHeight: 1,
  color: '#413E4D',
  wordBreak: 'break-word',
};
