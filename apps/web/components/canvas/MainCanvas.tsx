import { useRef, useState } from 'react';
import { useKeyPressEvent, useWindowSize } from 'react-use';
import { Stage, Layer } from 'react-konva';
import { Polaroids, PostIts } from 'web/components/canvas/shapes';
import { useRecoilState } from 'recoil';
import { canvasState } from 'web/atoms';

const SCALE_BY = 1.01;

interface Props {
  isShown: boolean;
}

function MainCanvas({ isShown }: Props) {
  const [canvas, setCanvas] = useRecoilState(canvasState);
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
      const newScale = e.evt.deltaY < 0 ? oldScale * SCALE_BY : oldScale / SCALE_BY;
      stage.scale({ x: newScale, y: newScale });
      const newPos = {
        x: pointerX - mousePointTo.x * newScale,
        y: pointerY - mousePointTo.y * newScale,
      };
      stage.position(newPos);
      stage.batchDraw();
    }
  }

  const spanRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  return (
    <div style={{ cursor }}>
      <input
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
      </span>
      <Stage
        ref={stageRef}
        draggable={isStageDraggable}
        width={width ?? 300}
        height={height ?? 300}
        onWheel={handleStageWheel}>
        <Layer>
          <PostIts postIts={canvas.postIts} />
          <Polaroids polaroids={canvas.polaroids} />
        </Layer>
      </Stage>
    </div>
  );
}

export default MainCanvas;
