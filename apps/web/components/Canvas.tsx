import { useState } from "react";
import { useWindowSize } from "react-use";
import { Stage, Layer, Rect } from "react-konva";

function generatePostIts() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    width: 100,
    height: 100,
    isDragging: false,
  }));
}

const INITIAL_STATE = generatePostIts();

interface Props {}

function Canvas({}: Props) {
  const { width, height } = useWindowSize();

  const [postIts, setPostIts] = useState(INITIAL_STATE);

  const handleDragPostIt = (e) => {
    const id = e.target.id();
    setPostIts(
      postIts.map((postIt) => {
        return {
          ...postIt,
          isDragging: postIt.id === id,
        };
      })
    );
  };

  const handleDragEnd = (e) => {
    setPostIts(
      postIts.map((postIt) => {
        return {
          ...postIt,
          isDragging: false,
        };
      })
    );
  };

  return (
    <Stage width={width ?? 300} height={height ?? 300}>
      <Layer>
        {postIts.map((postIt) => (
          <Rect
            key={postIt.id}
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
            scaleX={postIt.isDragging ? 1.2 : 1}
            scaleY={postIt.isDragging ? 1.2 : 1}
            onDragStart={handleDragPostIt}
            onDragEnd={handleDragEnd}
          />
        ))}
      </Layer>
    </Stage>
  );
}

export default Canvas;
