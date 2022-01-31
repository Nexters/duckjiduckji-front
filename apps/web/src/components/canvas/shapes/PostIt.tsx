import { KonvaEventObject } from 'konva/lib/Node';
import { Rect } from 'react-konva';
import { IPostIt } from 'web/src/shared/types';

interface Props {
  postIt: IPostIt;
  onDragStart: (postIt: IPostIt, e: KonvaEventObject<DragEvent>) => void;
  onDragEnd: (postIt: IPostIt, e: KonvaEventObject<DragEvent>) => void;
  isDraggable: boolean;
}

export function PostIt({ postIt, onDragEnd, onDragStart, isDraggable }: Props) {
  return (
    <Rect
      id={postIt.id}
      x={postIt.x}
      y={postIt.y}
      width={postIt.width}
      height={postIt.height}
      fill="#feff9c"
      opacity={1}
      draggable={isDraggable}
      shadowColor="black"
      shadowBlur={10}
      shadowOpacity={0.6}
      shadowOffsetX={postIt.isDragging ? 10 : 5}
      shadowOffsetY={postIt.isDragging ? 10 : 5}
      onDragStart={e => onDragStart(postIt, e)}
      onDragEnd={e => onDragEnd(postIt, e)}
    />
  );
}
