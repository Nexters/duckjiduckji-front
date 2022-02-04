import { useEffect, useRef, useState } from 'react';
import { Rect, Group, Text, Line, Image, Transformer } from 'react-konva';
import useImage from 'use-image';
import { IPolaroid } from 'web/shared/types';
import { POLAROID_WIDTH } from 'web/shared/consts';
import { KonvaEventObject } from 'konva/lib/Node';

type Props = {
  polaroid: IPolaroid;
  onTextAreaDoubleClick: (polaroid: IPolaroid, e: KonvaEventObject<MouseEvent>) => void;
  isDraggable: boolean;
  isSelected: boolean;
  onSelect: (polaroid: IPolaroid) => void;
  onChange: (polaroid: IPolaroid) => void;
};

export function Polaroid({ polaroid, isDraggable, isSelected, onTextAreaDoubleClick, onSelect, onChange }: Props) {
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
        width={polaroid.width}
        height={polaroid.height}
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
          <Rect x={33} y={33} width={240} height={360} fill="white" />

          {isImageShown ? (
            <Image image={image} x={33} y={33} width={240} height={360} />
          ) : (
            <>
              <Line
                points={[POLAROID_WIDTH / 2 - 8, 201, POLAROID_WIDTH / 2 + 8, 201]}
                stroke="#716E7A"
                strokeWidth={2}
              />
              <Line
                points={[POLAROID_WIDTH / 2, 201 - 8, POLAROID_WIDTH / 2, 201 + 8]}
                stroke="#716E7A"
                strokeWidth={2}
              />
              <Text text="사진을 넣어주세요!" x={97} y={224} fontSize={15} fontFamily="Pretendard" fill="#B8B7BC" />
            </>
          )}
        </Group>
        <Group id={polaroid.id} onDblClick={e => onTextAreaDoubleClick(polaroid, e)}>
          <Rect x={33} y={33 + 360 + 20} width={240} height={96} cornerRadius={5} fill="white" />
          <Text
            text={polaroid.text || '내용을 입력해주세요!'}
            x={33 + 14}
            y={33 + 360 + 20 + 14}
            fontFamily="Pretendard"
            fontSize={13}
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
