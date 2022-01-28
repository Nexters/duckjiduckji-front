import { useRef, useState, useCallback } from "react";
import { useKeyPressEvent, useWindowSize } from "react-use";
import { Stage, Layer } from "react-konva";
import PostIt from "./editor/Postit";
import Polaroid from "./editor/Polaroid";

const INITIAL_STATE = generatePostIts();
const SCALE_BY = 1.01;

const POLAROID_WIDTH = 306;
const POLAROID_HEIGHT = 528;

function generatePostIts() {
  const POSTIT_WIDTH = 200;
  const POSTIT_HEIHT = 200;
  console.log(POSTIT_HEIHT);
  return [...Array(5)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    width: POSTIT_WIDTH,
    height: POSTIT_HEIHT,
    isDragging: false,
  }));
}

interface Props {}

function Canvas({}: Props) {
  const { width, height } = useWindowSize();
  const [postIts, setPostIts] = useState(INITIAL_STATE);
  const [polaroids, setPolaroids] = useState([
    {
      id: "1",
      x: width / 2 - POLAROID_WIDTH / 2,
      y: height / 2 - POLAROID_HEIGHT / 2,
      width: POLAROID_WIDTH,
      height: POLAROID_HEIGHT,
      isDragging: false,
    },
  ]);
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

  console.log(stageRef.current);
  console.log(postIts);

  const handleDragStart = useCallback((e) => {
    const id = e.target.id();
    setPostIts((oldPostIts) =>
      oldPostIts.map((postIt) => ({
        ...postIt,
        isDragging: postIt.id === id,
      }))
    );
  }, []);

  // TODO: 드래그가 끝나는 시점에 옮겨진 좌표를 실제로 업데이트 해야 함.
  // TODO: PostIt 과 Polaroid 타입을 구분해서 이벤트 처리 해야 함
  const handleDragEnd = useCallback((e) => {
    setPostIts((oldPostIts) =>
      oldPostIts.map((postIt) => ({
        ...postIt,
        isDragging: false,
      }))
    );
  }, []);

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

      // TODO: SCALE_BY 라는 상수대신 휠의 속도를 고려한 deltaY 를 활용해야 할 듯
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
            <PostIt
              key={postIt.id}
              {...{
                postIt,
                onDragStart: handleDragStart,
                onDragEnd: handleDragEnd,
              }}
            />
          ))}
          {polaroids.map((polaroid) => (
            <Polaroid
              key={polaroid.id}
              {...{
                polaroid,
                onDragStart: handleDragStart,
                onDragEnd: handleDragEnd,
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default Canvas;
