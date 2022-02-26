import { useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useWindowSize } from 'react-use';
import Konva from 'konva';
import { Stage, Layer } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Polaroid, PostIt, PostItCreation } from 'web/components/canvas/shapes';
import {
  shapesState,
  changeColor,
  userActionState,
  changeStageAxis,
  changePostIt,
  socketApiSelector,
  backgroundState,
} from 'web/atoms';
import { Coordinates, IPolaroid, IPostIt } from 'web/shared/types';
import styled, { CSSProperties } from 'styled-components';
import { MESSAGE_TYPE, CONTENT_TYPE, DeletePoster } from 'socket-model';

import { POSTIT_HEIHT, POSTIT_WIDTH } from 'web/shared/consts';
import { Background } from './Background';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { uploadFile } from 'web/shared/utils';
import { SimpleImage } from './shapes/SimpleImage';

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

const getRootParentShape = (target, ROOT_LAYER_ID: number) => {
  if (!target.parent || target.parent._id === ROOT_LAYER_ID) return target;
  return getRootParentShape(target.parent, ROOT_LAYER_ID);
};

function MainCanvas({}: Props) {
  const [postItCreation, setPostItCreation] = useRecoilState(changePostIt);
  const backgroundSrc = useRecoilValue(backgroundState);
  const [stageAxis, setStageAxis] = useRecoilState(changeStageAxis);
  const color = useRecoilValue(changeColor);
  const [shapes, setShapes] = useRecoilState(shapesState);
  const [userAction, setUserAction] = useRecoilState(userActionState);
  const socketApi = useRecoilValue(socketApiSelector);
  const { width, height } = useWindowSize();
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const [selectedPolaroidIds, setSelectedPolaroidIds] = useState<string[]>([]);
  const [selectedPostItIds, setSelectedPostItIds] = useState<string[]>([]);
  const [typingText, setTypingText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [menuTarget, setMenuTarget] = useState<{ target?: any; data?: IPostIt | IPolaroid }>();
  const [menuPosition, setMenuPosition] = useState<MenuPosition>({
    top: '0px' as Pick<CSSProperties, 'top'>,
    left: '0px' as Pick<CSSProperties, 'left'>,
  });
  const {
    query: { roomId },
  } = useRouter();

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
    if (newScale < 1) return;
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
    console.log(e.target);
    if (clickedOnEmpty) {
      setSelectedPolaroidIds([]);
      setSelectedPostItIds([]);
    }
  }

  async function handleFileUpload(files) {
    if (!files.length) return;
    const file = files[0];
    const currentTargetId = selectedPolaroidIds[0];
    const uploadResult = await uploadFile(file, String(roomId));
    if (!uploadResult) toast.error('이미지 업로드에 실패했습니다.');
    setShapes(shapes => ({
      ...shapes,
      polaroids: shapes.polaroids.map(polaroid => {
        if (polaroid.id === currentTargetId) {
          return {
            ...polaroid,
            imgUrl: uploadResult.body.img_url,
          };
        }
        return polaroid;
      }),
    }));
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
    if (!menuTarget || !menuTarget.target || !layerRef.current) return;
    const target = getRootParentShape(menuTarget.target, layerRef.current._id);
    target.destroy();

    const message: DeletePoster = {
      msgType: MESSAGE_TYPE.DELETE,
      roomId: `${roomId}`,
      contentType: menuTarget.data.type === 'postIt' ? CONTENT_TYPE.postIt : CONTENT_TYPE.polaroid,
      contentId: menuTarget.data.id,
      userId: window.localStorage.getItem('userId'),
    };

    socketApi.sendRoom(message);

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
    if (event.target !== stageRef.current) return;

    const { y, x } = event.target.attrs;

    setStageAxis({ y, x });
  };

  return (
    <div style={{ position: 'relative' }}>
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
          <Background
            src={backgroundSrc}
            x={-(stageRef.current?.x() ?? 0)}
            y={-(stageRef.current?.y() ?? 0)}
            width={width ?? 0}
            height={height ?? 0}
          />
        </Layer>
        <Layer ref={layerRef}>
          {/* TODO: 필요시 Generic Shapes 컴포넌트 만들기 */}
          {shapes.postIts.map((postIt, index) => (
            <PostIt
              key={postIt.id}
              color={postIt.color}
              text={postIt.text}
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
                socketApi,
                roomId: `${roomId}`,
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
                onImageUploadClick: polaroid => {
                  fileInputRef.current.click();
                },
                onPolaroidTextChange: text => {
                  console.log(text);
                  setShapes(shapes => ({
                    ...shapes,
                    polaroids: shapes.polaroids.map(polaroid => {
                      if (polaroid.id === selectedPolaroidIds[0]) {
                        return {
                          ...polaroid,
                          text,
                        };
                      }
                      return polaroid;
                    }),
                  }));
                },
                color,
              }}
            />
          ))}
          {postItCreation.type === 'postit' && (
            <PostItCreation
              color={postItCreation.color}
              setPostItCreation={setPostItCreation}
              x={-stageAxis.x + Math.ceil(width / 2 - POSTIT_WIDTH / 2)}
              y={-stageAxis.y + Math.ceil(height / 2 - POSTIT_HEIHT / 2)}
            />
          )}
          {shapes.stickers.map((sticker, index) => (
            <SimpleImage x={sticker.x} y={sticker.y} key={index} src={sticker.imageURL} />
          ))}
        </Layer>
      </Stage>
      <input
        ref={fileInputRef}
        onChange={({ target }) => {
          handleFileUpload(target.files);
          target.value = null;
        }}
        type="file"
        accept="image/*"
        style={{ opacity: 0, position: 'fixed' }}
      />
      {/* <input
        ref={inputRef}
        style={{
          position: 'fixed',
          backgroundColor: 'rgba(255,255,255,0)',
          // color: 'rgba(0,0,0,0)',
          width: '100%',
          border: 0,
          outline: 'none',
          bottom: 200,
          left: 200,
        }}
        type="text"
        onChange={e => {
          e.preventDefault();
          setTypingText(e.target.value);
        }}
      /> */}
      <span ref={spanRef} style={{ position: 'fixed', bottom: 100 }}>
        {typingText}
      </span>
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
