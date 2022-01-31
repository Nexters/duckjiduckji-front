import { KonvaEventObject } from 'konva/lib/Node';
import { Rect } from 'react-konva';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IPostIt } from 'web/src/shared/types';
import { userActionState } from 'web/src/atoms';

interface Props {
  postIt: IPostIt;
  onDragStart: (postIt: IPostIt, e: KonvaEventObject<DragEvent>) => void;
  onDragEnd: (postIt: IPostIt, e: KonvaEventObject<DragEvent>) => void;
}

export function PostIt({ postIt, onDragEnd, onDragStart }: Props) {
  return (
    <Rect
      id={postIt.id}
      x={postIt.x}
      y={postIt.y}
      width={postIt.width}
      height={postIt.height}
      fill="#feff9c"
      opacity={1}
      draggable={true}
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
