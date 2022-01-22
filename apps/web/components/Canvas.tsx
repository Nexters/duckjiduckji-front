import { useRef, useState } from "react";
import { useKeyPressEvent, useWindowSize } from "react-use";
import { Stage, Layer, Rect, Line } from "react-konva";

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
type Tools = "PEN" | "ERASER";

interface Props {}

function Canvas({}: Props) {
  const { width, height } = useWindowSize();
  const [postIts, setPostIts] = useState(INITIAL_STATE);
  const [tool, setTool] = useState<Tools>("ERASER");
  const [lines, setLines] = useState([]);
  const [isStageDraggable, setIsStageDraggable] = useState(false);
  const [cursor, setCursor] = useState<string>("auto");
  const isDrawing = useRef(false);
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

  function handleMouseDown(e) {
    console.log(e);
    isDrawing.current = true;
    const pos = stageRef.current.getRelativePointerPosition();
    // console.log(e.target.getStage());
    // console.log(pos);
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    // console.log(e.target.stage.x());
  }
  console.log(lines);
  function handleMouseMove(e) {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const point = stageRef.current.getRelativePointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  }

  function handleMouseUp() {
    isDrawing.current = false;
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
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
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
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === "ERASER" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
      <select
        style={{ position: "fixed", bottom: "100px", left: "100px" }}
        value={tool}
        onChange={(e) => {
          const targetTool = e.currentTarget.value as Tools;
          setTool(targetTool);
        }}
      >
        <option value="PEN">Pen</option>
        <option value="ERASER">Eraser</option>
      </select>
    </div>
  );
}

export default Canvas;
