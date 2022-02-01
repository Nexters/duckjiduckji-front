import { useEffect, useRef, useState } from 'react';
import { Rect, Group, Text, Line, Image } from 'react-konva';
import useImage from 'use-image';
import { IPolaroid } from 'web/src/shared/types';
import { POLAROID_WIDTH } from 'web/src/shared/consts';
import { KonvaEventObject } from 'konva/lib/Node';

type Props = {
  polaroid: IPolaroid;
  onDragStart: (polaroid: IPolaroid, e: KonvaEventObject<DragEvent>) => void;
  onDragEnd: (polaroid: IPolaroid, e: KonvaEventObject<DragEvent>) => void;
  onTextAreaDoubleClick: (polaroid: IPolaroid, e: KonvaEventObject<MouseEvent>) => void;
  isDraggable: boolean;
  isSelected: boolean;
  onSelect: (polaroid: IPolaroid) => void;
};

export function Polaroid({
  polaroid,
  onDragEnd,
  onDragStart,
  onTextAreaDoubleClick,
  isDraggable,
  isSelected,
  onSelect,
}: Props) {
  const [image] = useImage(polaroid.imgUrl);
  const [isImageShown, setIsImageShown] = useState(false);
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  function handleTransformEnd() {
    // transformer is changing scale of the node
    // and NOT its width or height
    // but in the store we have only width and height
    // to match the data better we will reset scale on transform end
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // we will reset it back
    node.scaleX(1);
    node.scaleY(1);
    onChange({
      ...shapeProps,
      x: node.x(),
      y: node.y(),
      // set minimal value
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(node.height() * scaleY),
    });
  }

  return (
    <Group
      ref={shapeRef}
      onClick={() => onSelect(polaroid)}
      onTap={() => onSelect(polaroid)}
      onTransformEnd={handleTransformEnd}
      draggable={isDraggable}
      onDragStart={e => onDragStart(polaroid, e)}
      onDragEnd={e => onDragEnd(polaroid, e)}
    >
      <Rect
        id={polaroid.id}
        x={polaroid.x}
        y={polaroid.y}
        rotation={polaroid.rotation}
        width={polaroid.width}
        height={polaroid.height}
        cornerRadius={10}
        fill="#5BB0FF"
        opacity={1}
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.6}
        shadowOffsetX={polaroid.isDragging ? 10 : 5}
        shadowOffsetY={polaroid.isDragging ? 10 : 5}
      />
      <Group onClick={() => setIsImageShown(true)} onTouchEnd={() => setIsImageShown(true)}>
        <Rect x={polaroid.x + 33} y={polaroid.y + 33} width={240} height={360} fill="white" />

        {isImageShown ? (
          <Image image={image} x={polaroid.x + 33} y={polaroid.y + 33} width={240} height={360} />
        ) : (
          <>
            <Line
              points={[
                polaroid.x + POLAROID_WIDTH / 2 - 8,
                polaroid.y + 201,
                polaroid.x + POLAROID_WIDTH / 2 + 8,
                polaroid.y + 201,
              ]}
              stroke="#716E7A"
              strokeWidth={2}
            />
            <Line
              points={[
                polaroid.x + POLAROID_WIDTH / 2,
                polaroid.y + 201 - 8,
                polaroid.x + POLAROID_WIDTH / 2,
                polaroid.y + 201 + 8,
              ]}
              stroke="#716E7A"
              strokeWidth={2}
            />
            <Text
              text="사진을 넣어주세요!"
              x={polaroid.x + 97}
              y={polaroid.y + 224}
              fontSize={15}
              fontFamily="Pretendard"
              fill="#B8B7BC"
            />
          </>
        )}
      </Group>
      <Group id={polaroid.id} onDblClick={e => onTextAreaDoubleClick(polaroid, e)}>
        <Rect
          x={polaroid.x + 33}
          y={polaroid.y + 33 + 360 + 20}
          width={240}
          height={96}
          cornerRadius={5}
          fill="white"
        />
        <Text
          text={polaroid.text || '내용을 입력해주세요!'}
          x={polaroid.x + 33 + 14}
          y={polaroid.y + 33 + 360 + 20 + 14}
          fontFamily="Pretendard"
          fontSize={13}
          fill={polaroid.text ? '#595664' : '#B8B7BC'}
        />
      </Group>
    </Group>
  );
}
