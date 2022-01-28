import { useRef, useState } from "react";
import { useKeyPressEvent, useWindowSize } from "react-use";
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
const SCALE_BY = 1.01;

interface Props {}

function Canvas({}: Props) {
  const { width, height } = useWindowSize();
  const [postIts, setPostIts] = useState(INITIAL_STATE);
  const [isStageDraggable, setIsStageDraggable] = useState(false);
  const [cursor, setCursor] = useState<string>("auto");
  const stageRef = useRef(null);
  useKeyPressEvent(
    " ",
    () => {
      setIsStageDraggable(true);
      setCursor("grab");
    },
    () => {
      setIsStageDraggable(false);
      setCursor("auto");
    }
  );

  function handleStageWheel(e) {
    e.evt.preventDefault();
    const stage = stageRef.current;
    if (stage) {
      const oldScale = stage.scaleX();
      const { x: pointerX, y: pointerY } = stage.getPointerPosition();
      const mousePointTo = {
        x: (pointerX - stage.x()) / oldScale,
        y: (pointerY - stage.y()) / oldScale,
      };
      const newScale =
        e.evt.deltaY < 0 ? oldScale * SCALE_BY : oldScale / SCALE_BY;
      stage.scale({ x: newScale, y: newScale });
      const newPos = {
        x: pointerX - mousePointTo.x * newScale,
        y: pointerY - mousePointTo.y * newScale,
      };
      stage.position(newPos);
      stage.batchDraw();
    }
  }

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
    <div style={{ cursor }}>
      <Stage
        ref={stageRef}
        draggable={isStageDraggable}
        width={width ?? 300}
        height={height ?? 300}
        onWheel={handleStageWheel}
      >
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
              onDragStart={handleDragPostIt}
              onDragEnd={handleDragEnd}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default Canvas;
