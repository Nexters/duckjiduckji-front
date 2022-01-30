import { useRef, useState, useCallback } from 'react';
import { useKeyPressEvent, useWindowSize } from 'react-use';
import { Stage, Layer } from 'react-konva';
import PostIt from 'web/components/editor/PostIt';
import Polaroid from 'web/components/editor/Polaroid';
import { useRecoilState } from 'recoil';
import { canvasState } from 'web/atoms';
import { IPolaroid, IPostIt } from 'web/atoms/types';
import { KonvaEventObject } from 'konva/lib/Node';

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

  const [target, setTarget] = useState<any>({});

  const handleDragStart = useCallback((target: IPolaroid | IPostIt, e: KonvaEventObject<DragEvent>) => {
    const id = e.target.id();
    // setCanvas(oldCanvas => ({...oldCanvas, })
    //   oldPostIts.map(postIt => ({
    //     ...postIt,
    //     isDragging: postIt.id === id,
    //   })),
    // );
  }, []);

  // TODO: 드래그가 끝나는 시점에 옮겨진 좌표를 실제로 업데이트 해야 함.
  // TODO: PostIt 과 Polaroid 타입을 구분해서 이벤트 처리 해야 함
  const handleDragEnd = useCallback(e => {
    console.log(e);
    // setPostIts(oldPostIts =>
    //   oldPostIts.map(postIt => ({
    //     ...postIt,
    //     isDragging: false,
    //   })),
    // );
  }, []);

  const handleTextAreaDoubleClick = (polaroid: IPolaroid, e: KonvaEventObject<MouseEvent>) => {
    console.log(polaroid, e);
    inputRef.current.value = '';
    inputRef.current.focus();
    setTarget(polaroid);
    setInputStyle({
      opacity: 1,
      position: 'fixed',
      contain: 'strict',
      left: polaroid.x + 33 + 14,
      top: polaroid.y + 33 + 360 + 20 + 13,
      fontSize: 13,
      outlineStyle: 'none',
      border: 'none',
      width: 216,
      height: 70,
      resize: 'none',
      fontFamily: 'Pretendard',
      color: '#595664',
    });
  };

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

  return (
    <div style={{ cursor }}>
      <Stage
        ref={stageRef}
        draggable={isStageDraggable}
        width={width ?? 300}
        height={height ?? 300}
        onWheel={handleStageWheel}>
        <Layer>
          {canvas.postIts.map(postIt => (
            <PostIt
              key={postIt.id}
              {...{
                postIt,
                onDragStart: handleDragStart,
                onDragEnd: handleDragEnd,
              }}
            />
          ))}
          {isShown &&
            canvas.polaroids.map(polaroid => (
              <Polaroid
                key={polaroid.id}
                {...{
                  polaroid,
                  onTextAreaDoubleClick: handleTextAreaDoubleClick,
                  onDragStart: handleDragStart,
                  onDragEnd: handleDragEnd,
                }}
              />
            ))}
        </Layer>
      </Stage>
      <textarea
        style={inputStyle}
        ref={inputRef}
        onChange={e => {
          const updatedPolaroids = canvas.polaroids.map(polaroid => {
            if (polaroid.id === target.id) return { ...polaroid, text: e.target.value };
            return polaroid;
          });
          setCanvas(oldCanvas => ({ ...oldCanvas, polaroids: updatedPolaroids }));
        }}
        onBlur={() => setInputStyle({ opacity: 0 })}
      />
    </div>
  );
}

export default MainCanvas;
