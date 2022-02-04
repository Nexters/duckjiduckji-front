import { useEffect, useRef } from 'react';
import { Rect, Transformer } from 'react-konva';
import { IPostIt } from 'web/shared/types';

interface Props {
  postIt: IPostIt;
  isDraggable: boolean;
  isSelected: boolean;
  onSelect: (polaroid: IPostIt) => void;
  onChange: (polaroid: IPostIt) => void;
}

export function PostIt({ postIt, isDraggable, isSelected, onSelect, onChange }: Props) {
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
      ...postIt,
      x: node.x(),
      y: node.y(),
      rotation: node.rotation(),
    });
  }

  return (
    <>
      <Rect
        id={postIt.id}
        x={postIt.x}
        y={postIt.y}
        rotation={postIt.rotation}
        width={postIt.width}
        height={postIt.height}
        ref={shapeRef}
        onClick={() => onSelect(postIt)}
        onTap={() => onSelect(postIt)}
        onTransformEnd={handleTransformEnd}
        onDragEnd={e => {
          onChange({ ...postIt, x: e.target.x(), y: e.target.y() });
        }}
        fill="#feff9c"
        draggable={isDraggable}
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.6}
        shadowOffsetX={postIt.isDragging ? 10 : 5}
        shadowOffsetY={postIt.isDragging ? 10 : 5}
      />
      {isSelected && (
        <Transformer ref={trRef} resizeEnabled={false} centeredScaling={true} rotationSnaps={[0, 90, 180, 270]} />
      )}
    </>
  );
}
