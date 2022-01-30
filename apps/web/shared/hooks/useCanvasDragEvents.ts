import { useCallback } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { IPolaroid, IPostIt } from 'web/shared/types';

export function useCanvasDragEvents() {
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

  return {
    handleDragStart,
    handleDragEnd,
  };
}
