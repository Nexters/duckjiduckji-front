import { useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useWindowSize } from 'react-use';
import Konva from 'konva';
import { Stage, Layer } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Polaroid, PostIt } from 'web/components/canvas/shapes';
import { shapesState, userActionState } from 'web/recoil';
import { IPolaroid, IPostIt, Coordinates } from 'web/shared/types';
import styled, { CSSProperties } from 'styled-components';

import { changeStageAxis } from 'web/atoms/stageAxis';
import { changeColor } from '../../atoms/create';

const SCALE_BY = 1.01;
Konva.hitOnDragEnabled = true;

function getDistance(p1: Coordinates, p2: Coordinates) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCenter(p1: Coordinates, p2: Coordinates) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}

const stageAttrs = {
  lastCenter: null,
  lastDist: 0,
};

interface Props {}
interface MenuPosition {
  top: Pick<CSSProperties, 'top'>;
  left: Pick<CSSProperties, 'left'>;
}

const ROOT_LAYER_ID = 13;
const getRootParentShape = target => {
  if (!target.parent || target.parent._id === ROOT_LAYER_ID) return target;
  return getRootParentShape(target.parent);
};

function MainCanvas({}: Props) {
  const [stageAxis, setStageAxis] = useRecoilState(changeStageAxis);
  const color = useRecoilValue(changeColor);
  const [shapes, setShapes] = useRecoilState(shapesState);
  const [userAction, setUserAction] = useRecoilState(userActionState);
  const { width, height } = useWindowSize();
  const stageRef = useRef(null);
  const [selectedPolaroidIds, setSelectedPolaroidIds] = useState<string[]>([]);
  const [selectedPostItIds, setSelectedPostItIds] = useState<string[]>([]);
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [menuTarget, setMenuTarget] = useState<{ target?: any; data?: IPostIt | IPolaroid }>();
  const [menuPosition, setMenuPosition] = useState<MenuPosition>({
    top: '0px' as Pick<CSSProperties, 'top'>,
    left: '0px' as Pick<CSSProperties, 'left'>,
  });

  const isShapesDraggable = userAction === 'pinch' ? false : true;

  function handleStageWheel(e: KonvaEventObject<WheelEvent>) {
    e.evt.preventDefault();
    const stage = stageRef.current;
    if (!stage) return;
    const oldScale = stageRef.current.scaleX();
    const { x: pointerX, y: pointerY } = stageRef.current.getPointerPosition();
    const mousePointTo = {
      x: (pointerX - stageRef.current.x()) / oldScale,
      y: (pointerY - stageRef.current.y()) / oldScale,
    };

    // deltaY 크기로 스크롤 줌인/아웃 속도 조절
    const newScale =
      e.evt.deltaY < 0
        ? oldScale * (SCALE_BY + Math.abs(e.evt.deltaY) / 5000)
        : oldScale / (SCALE_BY + Math.abs(e.evt.deltaY) / 5000);
    stageRef.current.scale({ x: newScale, y: newScale });
    const newPos = {
      x: pointerX - mousePointTo.x * newScale,
      y: pointerY - mousePointTo.y * newScale,
    };
    stageRef.current.position(newPos);
    stageRef.current.batchDraw();
  }

  function handleStageTouchMove(e: KonvaEventObject<TouchEvent>) {
    e.evt.preventDefault();
    const touch1 = e.evt.touches[0];
    const touch2 = e.evt.touches[1];
    if (!touch1 || !touch2) return;
    // if the stage was under Konva's drag&drop
    // we need to stop it, and implement our own pan logic with two pointers
    if (stageRef.current.isDragging()) {
      stageRef.current.stopDrag();
    }

    // prevent shapes from dragging while pinch zoom
    setUserAction('pinch');

    const p1 = {
      x: touch1.clientX,
      y: touch1.clientY,
    };
    const p2 = {
      x: touch2.clientX,
      y: touch2.clientY,
    };

    if (!stageAttrs.lastCenter) {
      stageAttrs.lastCenter = getCenter(p1, p2);
      return;
    }
    const newCenter = getCenter(p1, p2);
    const dist = getDistance(p1, p2);
    if (!stageAttrs.lastDist) {
      stageAttrs.lastDist = dist;
    }
    // local coordinates of center point
    const pointTo = {
      x: (newCenter.x - stageRef.current.x()) / stageRef.current.scaleX(),
      y: (newCenter.y - stageRef.current.y()) / stageRef.current.scaleX(),
    };

    const scale = stageRef.current.scaleX() * (dist / stageAttrs.lastDist);
    stageRef.current.scaleX(scale);
    stageRef.current.scaleY(scale);

    // calculate new position of the stage
    const dx = newCenter.x - stageAttrs.lastCenter.x;
    const dy = newCenter.y - stageAttrs.lastCenter.y;

    const newPos = {
      x: newCenter.x - pointTo.x * scale + dx,
      y: newCenter.y - pointTo.y * scale + dy,
    };

    stageRef.current.position(newPos);
    stageAttrs.lastDist = dist;
    stageAttrs.lastCenter = newCenter;
  }

  function handleStageTouchEnd() {
    stageAttrs.lastDist = 0;
    stageAttrs.lastCenter = null;
    setUserAction('browse');
  }

  function checkDeselect(e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>) {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedPolaroidIds([]);
      setSelectedPostItIds([]);
    }
  }

  const handleStageClick = (e: KonvaEventObject<MouseEvent>) => {
    e.evt.preventDefault();
    if (e.evt.which === 3) return;

    setMenuOpen(false);
  };

  const handleContextMenu = (e: KonvaEventObject<PointerEvent>) => {
    e.evt.preventDefault();
    if (!e.target.parent) {
      // if we are on empty place of the stage we will do nothing
      setMenuOpen(false);
      return;
    }

    const containerRect = stageRef.current.container().getBoundingClientRect();
    const top = (containerRect.top + stageRef.current.getPointerPosition().y + 4 + 'px') as Pick<CSSProperties, 'top'>;
    const left = (containerRect.left + stageRef.current.getPointerPosition().x + 4 + 'px') as Pick<
      CSSProperties,
      'left'
    >;

    setMenuTarget({ target: e.target });
    setMenuOpen(true);
    setMenuPosition({ top, left });
  };

  const handleMenuDeleteClick = () => {
    if (!menuTarget || !menuTarget.target) return;
    const target = getRootParentShape(menuTarget.target);
    target.destroy();
    setMenuOpen(false);
    setShapes(prev => {
      if (menuTarget.data.type === 'polaroid') {
        const refinedPolaroids = prev.polaroids.filter(item => item.id !== menuTarget.data.id);
        return { ...prev, polaroids: refinedPolaroids };
      } else {
        const refinedPostIts = prev.postIts.filter(item => item.id !== menuTarget.data.id);
        return { ...prev, postIts: refinedPostIts };
      }
    });
  };

  const handlePostItClick = (e: KonvaEventObject<MouseEvent>, data: IPostIt) => {
    e.evt.preventDefault();

    // 우클릭시 menu 창에 현재 postIt 데이터 넘기기위해 존재
    if (e.evt.which === 3) {
      setMenuTarget(prev => ({ ...prev, data }));
    }
  };

  const handlePolaroidClick = (e: KonvaEventObject<MouseEvent>, data: IPolaroid) => {
    e.evt.preventDefault();

    // 우클릭시 menu 창에 현재 postIt 데이터 넘기기위해 존재
    if (e.evt.which === 3) {
      setMenuTarget(prev => ({ ...prev, data }));
    }
  };

  const setStageAxisDragEnd = (event: KonvaEventObject<DragEvent>) => {
    const { y, x } = event.target.attrs;

    setStageAxis({ y, x });
  };

  return (
    <div>
      <Stage
        ref={stageRef}
        draggable={true}
        width={width}
        height={height}
        onDragEnd={setStageAxisDragEnd}
        onWheel={handleStageWheel}
        onTouchEnd={handleStageTouchEnd}
        onTouchMove={handleStageTouchMove}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        onContextMenu={handleContextMenu}
        onClick={handleStageClick}
      >
        <Layer>
          {/* TODO: 필요시 Generic Shapes 컴포넌트 만들기 */}
          {shapes.postIts.map((postIt, index) => (
            <PostIt
              key={postIt.id}
              {...{
                postIt,
                isDraggable: isShapesDraggable,
                isSelected: selectedPostItIds.includes(postIt.id),
                onSelect: () => {
                  setSelectedPolaroidIds([]);
                  setSelectedPostItIds([postIt.id]);
                },
                onClick: handlePostItClick,
                onChange: postIt => {
                  const postIts = shapes.postIts.slice();
                  postIts[index] = postIt;
                  setShapes(oldShapes => ({
                    ...oldShapes,
                    postIt,
                  }));
                },
              }}
            />
          ))}
          {shapes.polaroids.map((polaroid, index) => (
            <Polaroid
              key={polaroid.id}
              {...{
                polaroid,
                isDraggable: isShapesDraggable,
                isSelected: selectedPolaroidIds.includes(polaroid.id),
                onSelect: () => {
                  setSelectedPostItIds([]);
                  setSelectedPolaroidIds([polaroid.id]);
                },
                onClick: handlePolaroidClick,
                onChange: polaroid => {
                  const polaroids = shapes.polaroids.slice();
                  polaroids[index] = polaroid;
                  setShapes(oldShapes => ({
                    ...oldShapes,
                    polaroids,
                  }));
                },
                onTextAreaDoubleClick: () => {},
                color,
              }}
            />
          ))}
        </Layer>
      </Stage>
      <MenuNode top={menuPosition.top} left={menuPosition.left} isMenuOpen={isMenuOpen}>
        <div>
          <button>Pulse</button>
          <button onClick={handleMenuDeleteClick}>Delete</button>
        </div>
      </MenuNode>
    </div>
  );
}

const MenuNode = styled.div<{
  isMenuOpen: boolean;
  top: Pick<CSSProperties, 'top'>;
  left: Pick<CSSProperties, 'left'>;
}>`
  display: ${props => (props.isMenuOpen ? 'initial' : 'none')};
  position: absolute;
  width: 60px;
  background-color: white;
  box-shadow: 0 0 5px grey;
  border-radius: 3px;
  top: ${({ top }) => top};
  left: ${({ left }) => left};

  button {
    width: 100%;
    background-color: white;
    border: none;
    margin: 0;
    padding: 10px;
  }

  button:hover {
    background-color: lightgray;
  }
`;

export default MainCanvas;
