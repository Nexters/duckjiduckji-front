import { KonvaEventObject } from 'konva/lib/Node';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { Rect, Group, Text, Transformer } from 'react-konva';
import { Html } from 'react-konva-utils';
import { IPostIt } from 'web/shared/types';
import { POSTIT_HEIHT, POSTIT_WIDTH, POSTIT_PADDING } from 'web/shared/consts';

interface Props {
  postIt: IPostIt;
  isDraggable: boolean;
  isSelected: boolean;
  onClick: (e: KonvaEventObject<MouseEvent>, id: IPostIt) => void;
  onSelect: (polaroid: IPostIt) => void;
  onChange: (polaroid: IPostIt) => void;
  color?: string;
  text?: string;
}

export function PostIt({ postIt, isDraggable, isSelected, onSelect, onClick, onChange, color, text }: Props) {
  const shapeRef = useRef(null);
  const trRef = useRef(null);
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  function handleTransformEnd() {
    const node = shapeRef.current;

    onChange({
      ...postIt,
      x: node.x(),
      y: node.y(),
      rotation: node.rotation(),
    });
  }

  return (
    <Group
      id={postIt.id}
      x={postIt.x}
      y={postIt.y}
      width={POSTIT_WIDTH}
      height={POSTIT_HEIHT}
      rotation={postIt.rotation}
      onClick={e => {
        onClick(e, postIt);
        onSelect(postIt);
      }}
      onTap={() => onSelect(postIt)}
      onTransformEnd={handleTransformEnd}
      onDragEnd={e => {
        onChange({ ...postIt, x: e.target.x(), y: e.target.y() });
      }}
      draggable={isDraggable}
    >
      <Rect
        ref={shapeRef}
        width={POSTIT_WIDTH}
        height={POSTIT_HEIHT}
        fill={color || '#feff9c'}
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.6}
        shadowOffsetX={postIt.isDragging ? 10 : 5}
        shadowOffsetY={postIt.isDragging ? 10 : 5}
      />
      {!isSelected && (
        <Text
          value={text}
          x={POSTIT_PADDING}
          y={POSTIT_PADDING}
          fontSize={16}
          text={text}
          lineHeight={1.2}
          width={POSTIT_WIDTH - 2 * POSTIT_PADDING}
        />
      )}
      {isSelected && (
        <Transformer ref={trRef} resizeEnabled={false} centeredScaling={true} rotationSnaps={[0, 90, 180, 270]} />
      )}
    </Group>
  );
}

const textAreaStyle: CSSProperties = {
  background: 'transparent',
  resize: 'none',
  border: 'none',
  padding: '0',
  width: `${POSTIT_WIDTH - 2 * POSTIT_PADDING}px`,
  fontSize: '16px',
  outline: 'none',
  height: `${POSTIT_HEIHT - 2 * POSTIT_PADDING}px`,
  position: 'absolute',
  fontFamily: 'Pretendard',
  lineHeight: 1.2,
};
