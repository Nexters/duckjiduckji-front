import { Rect } from "react-konva";

type PostIt = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isDragging: boolean;
};

type Props = {
  postIt: PostIt;
  onDragStart: (e) => void;
  onDragEnd: (e) => void;
};

function PostIt({ postIt, onDragEnd, onDragStart }: Props) {
  return (
    <Rect
      id={postIt.id}
      x={postIt.x}
      y={postIt.y}
      width={postIt.width}
      height={postIt.height}
      fill="#feff9c"
      opacity={1}
      draggable
      shadowColor="black"
      shadowBlur={10}
      shadowOpacity={0.6}
      shadowOffsetX={postIt.isDragging ? 10 : 5}
      shadowOffsetY={postIt.isDragging ? 10 : 5}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    />
  );
}

export default PostIt;
