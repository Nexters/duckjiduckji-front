import { Rect, Group, Text, Line } from "react-konva";
import { Html } from "react-konva-utils";

const POLAROID_WIDTH = 306;
const POLAROID_HEIGHT = 528;

type Polaroid = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isDragging: boolean;
  text: string;
};

type Props = {
  polaroid: Polaroid;
  onDragStart: (e) => void;
  onDragEnd: (e) => void;
  onTextAreaDoubleClick: (polaroid: Polaroid) => void;
};

function Polaroid({
  polaroid,
  onDragEnd,
  onDragStart,
  onTextAreaDoubleClick,
}: Props) {
  return (
    <Group draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Rect
        id={polaroid.id}
        x={polaroid.x}
        y={polaroid.y}
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
      <Group>
        <Rect
          x={polaroid.x + 33}
          y={polaroid.y + 33}
          width={240}
          height={360}
          fill="white"
        />
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
      </Group>
      <Group
        id={polaroid.id}
        onDblClick={() => onTextAreaDoubleClick(polaroid)}
      >
        <Rect
          x={polaroid.x + 33}
          y={polaroid.y + 33 + 360 + 20}
          width={240}
          height={96}
          cornerRadius={5}
          fill="white"
        />
        <Text
          text={polaroid.text || "내용을 입력해주세요!"}
          x={polaroid.x + 33 + 14}
          y={polaroid.y + 33 + 360 + 20 + 14}
          fontFamily="Pretendard"
          fontSize={13}
          fill={polaroid.text ? "#595664" : "#B8B7BC"}
        />
        {/* <Html
          transform={true}
          transformFunc={(attrs) => ({
            ...attrs,
            x: polaroid.x + 33 + 14,
            y: polaroid.y + 33 + 360 + 20 + 13,
          })}
        >
          <input placeholder="내용을 입력해주세요!" />
        </Html> */}
      </Group>
    </Group>
  );
}

export default Polaroid;
