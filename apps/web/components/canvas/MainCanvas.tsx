import { useRef, useState } from 'react';
import { useKeyPressEvent, useWindowSize } from 'react-use';
import { Stage, Layer } from 'react-konva';
import Konva from 'konva';
import { Polaroids, PostIts } from 'web/components/canvas/shapes';
import { useRecoilState } from 'recoil';
import { shapesState, userActionState } from 'web/atoms';

const SCALE_BY = 1.01;
Konva.hitOnDragEnabled = true;

function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCenter(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}

var lastCenter = null;
var lastDist = 0;

interface Props {}

function MainCanvas({}: Props) {
  const [canvas, setCanvas] = useRecoilState(shapesState);
  const [userAction, setUserAction] = useRecoilState(userActionState);
  const { width, height } = useWindowSize();
  const [isStageDraggable, setIsStageDraggable] = useState(false);
  const [cursor, setCursor] = useState<string>('auto');
  const stageRef = useRef(null);
  useKeyPressEvent(
    ' ',
    () => {
      setIsStageDraggable(true);
      setCursor('grab');
    },
    () => {
      setIsStageDraggable(false);
      setCursor('auto');
    },
  );
  const inputRef = useRef(null);
  const [inputStyle, setInputStyle] = useState<any>({
    background: 'red',
  });

  console.log(userAction);

  function handleStageWheel(e) {
    e.evt.preventDefault();
    const stage = stageRef.current;
    if (stage) {
      const oldScale = stageRef.current.scaleX();
      const { x: pointerX, y: pointerY } = stageRef.current.getPointerPosition();
      const mousePointTo = {
        x: (pointerX - stageRef.current.x()) / oldScale,
        y: (pointerY - stageRef.current.y()) / oldScale,
      };

      // TODO: SCALE_BY 라는 상수대신 휠의 속도를 고려한 deltaY 를 활용해야 할 듯
      const newScale = e.evt.deltaY < 0 ? oldScale * SCALE_BY : oldScale / SCALE_BY;
      stageRef.current.scale({ x: newScale, y: newScale });
      const newPos = {
        x: pointerX - mousePointTo.x * newScale,
        y: pointerY - mousePointTo.y * newScale,
      };
      stageRef.current.position(newPos);
      stageRef.current.batchDraw();
    }
  }

  const spanRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  return (
    <div style={{ cursor }}>
      {/* <input
        type="text"
        onChange={e => setInputValue(e.currentTarget.value)}
        style={{
          fontSize: 22,
          position: 'fixed',
          top: 200,
          left: 100,
          zIndex: 1,
          opacity: 1,
          margin: 0,
          padding: 0,
          border: 0,
          outline: 'none',
          textDecoration: 'none',
          background: 'rgba(0, 0, 0, 0)',
        }}
      />
      <span ref={spanRef} style={{ display: 'none', position: 'fixed' }}>
        {inputValue}
      </span> */}
      <Stage
        ref={stageRef}
        draggable={isStageDraggable}
        width={width ?? 300}
        height={height ?? 300}
        onWheel={handleStageWheel}
        onTouchEnd={e => {
          lastDist = 0;
          lastCenter = null;
        }}
        onTouchMove={e => {
          e.evt.preventDefault();
          var touch1 = e.evt.touches[0];
          var touch2 = e.evt.touches[1];

          if (touch1 && touch2) {
            // if the stage was under Konva's drag&drop
            // we need to stop it, and implement our own pan logic with two pointers
            if (stageRef.current.isDragging()) {
              stageRef.current.stopDrag();
            }

            var p1 = {
              x: touch1.clientX,
              y: touch1.clientY,
            };
            var p2 = {
              x: touch2.clientX,
              y: touch2.clientY,
            };

            if (!lastCenter) {
              lastCenter = getCenter(p1, p2);
              return;
            }
            var newCenter = getCenter(p1, p2);

            var dist = getDistance(p1, p2);

            if (!lastDist) {
              lastDist = dist;
            }

            // local coordinates of center point
            var pointTo = {
              x: (newCenter.x - stageRef.current.x()) / stageRef.current.scaleX(),
              y: (newCenter.y - stageRef.current.y()) / stageRef.current.scaleX(),
            };

            var scale = stageRef.current.scaleX() * (dist / lastDist);

            stageRef.current.scaleX(scale);
            stageRef.current.scaleY(scale);

            // calculate new position of the stage
            var dx = newCenter.x - lastCenter.x;
            var dy = newCenter.y - lastCenter.y;

            var newPos = {
              x: newCenter.x - pointTo.x * scale + dx,
              y: newCenter.y - pointTo.y * scale + dy,
            };

            stageRef.current.position(newPos);

            lastDist = dist;
            lastCenter = newCenter;
          }
        }}>
        <Layer>
          <PostIts postIts={canvas.postIts} />
          <Polaroids polaroids={canvas.polaroids} />
        </Layer>
      </Stage>
    </div>
  );
}

export default MainCanvas;
