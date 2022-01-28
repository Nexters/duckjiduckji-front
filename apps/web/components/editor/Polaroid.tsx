import { Rect } from "react-konva";

type Polaroid = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isDragging: boolean;
};

type Props = {
  polaroid: Polaroid;
  onDragStart: (e) => void;
  onDragEnd: (e) => void;
};

function Polaroid({ polaroid, onDragEnd, onDragStart }: Props) {
  return (
    <Rect
      id={polaroid.id}
      x={polaroid.x}
      y={polaroid.y}
      width={polaroid.width}
      height={polaroid.height}
      cornerRadius={10}
      fill="#5BB0FF"
      opacity={1}
      draggable
      shadowColor="black"
      shadowBlur={10}
      shadowOpacity={0.6}
      shadowOffsetX={polaroid.isDragging ? 10 : 5}
      shadowOffsetY={polaroid.isDragging ? 10 : 5}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    />
  );
}

export default Polaroid;
