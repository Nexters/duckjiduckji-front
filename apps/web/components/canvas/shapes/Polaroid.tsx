import { useEffect, useRef, useState } from 'react';
import { Rect, Group, Text, Line, Image, Transformer } from 'react-konva';
import useImage from 'use-image';
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
  POLAROID_CLIENT_WIDTH,
  POLAROID_LOWER_CLIENT_HEIGHT,
  POLAROID_OFFSET_HEIGHT,
  POLAROID_OFFSET_WIDTH,
  POLAROID_UPPER_CLIENT_HEIGHT,
} from 'web/shared/consts';
import { KonvaEventObject } from 'konva/lib/Node';

type Props = {
  polaroid: IPolaroid;
  onTextAreaDoubleClick: (polaroid: IPolaroid, e: KonvaEventObject<MouseEvent>) => void;
  isDraggable: boolean;
  isSelected: boolean;
  onSelect: (polaroid: IPolaroid) => void;
  onChange: (polaroid: IPolaroid) => void;
  color?: string;
};

export function Polaroid({
  polaroid,
  isDraggable,
  isSelected,
  onTextAreaDoubleClick,
  onSelect,
  onChange,
  color,
}: Props) {
  const [image] = useImage(polaroid.imgUrl);
  const [isImageShown, setIsImageShown] = useState(false);
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    if (!isSelected) return;
    trRef.current.nodes([shapeRef.current]);
    trRef.current.getLayer().batchDraw();
  }, [isSelected]);

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
        onClick={() => onSelect(polaroid)}
        onTap={() => onSelect(polaroid)}
        onTransformEnd={handleTransformEnd}
        draggable={isDraggable}
        onDragEnd={e => {
          onChange({ ...polaroid, x: e.target.x(), y: e.target.y() });
        }}
      >
        <Rect
          width={POLAROID_OFFSET_WIDTH}
          height={POLAROID_OFFSET_HEIGHT}
          cornerRadius={OUTER_CORNER_RADIUS}
          fill={color || '#5BB0FF'}
          opacity={1}
          shadowColor="black"
          shadowBlur={10}
          shadowOpacity={0.6}
          shadowOffsetX={polaroid.isDragging ? 10 : 5}
          shadowOffsetY={polaroid.isDragging ? 10 : 5}
        />
        <Group onClick={() => setIsImageShown(true)} onTouchEnd={() => setIsImageShown(true)}>
          <Rect
            x={POLAROID_BORDER_WIDTH}
            y={POLAROID_BORDER_WIDTH}
            width={POLAROID_CLIENT_WIDTH}
            height={POLAROID_UPPER_CLIENT_HEIGHT}
            fill="white"
          />

          {isImageShown ? (
            <Image
              image={image}
              x={POLAROID_BORDER_WIDTH}
              y={POLAROID_BORDER_WIDTH}
              width={POLAROID_CLIENT_WIDTH}
              height={POLAROID_UPPER_CLIENT_HEIGHT}
              alt=""
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
        <Group id={polaroid.id} onDblClick={e => onTextAreaDoubleClick(polaroid, e)}>
          <Rect
            x={POLAROID_BORDER_WIDTH}
            y={POLAROID_BORDER_WIDTH + POLAROID_UPPER_CLIENT_HEIGHT + GAP_HEIGHT}
            width={POLAROID_CLIENT_WIDTH}
            height={POLAROID_LOWER_CLIENT_HEIGHT}
            cornerRadius={INNER_CORNER_RADIUS}
            fill="white"
          />
          <Text
            text={polaroid.text || '내용을 입력해주세요!'}
            x={POLAROID_BORDER_WIDTH + PADDING}
            y={POLAROID_BORDER_WIDTH + POLAROID_UPPER_CLIENT_HEIGHT + GAP_HEIGHT + PADDING}
            fontFamily="Pretendard"
            fontSize={FONT_SIZE}
            fill={polaroid.text ? '#595664' : '#B8B7BC'}
          />
        </Group>
      </Group>
      {isSelected && (
        <Transformer ref={trRef} resizeEnabled={false} centeredScaling={true} rotationSnaps={[0, 90, 180, 270]} />
      )}
    </>
  );
}
