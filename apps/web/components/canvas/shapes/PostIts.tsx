import { IPostIt } from 'web/shared/types';
import { PostIt } from 'web/components/canvas/shapes';
import { useCanvasDragEvents } from 'web/shared/hooks/useCanvasDragEvents';

interface Props {
  postIts: IPostIt[];
}

export function PostIts({ postIts }: Props) {
  const { handleDragStart, handleDragEnd } = useCanvasDragEvents();

  return (
    <>
      {postIts.map(postIt => (
        <PostIt
          key={postIt.id}
          {...{
            postIt,
            onDragStart: handleDragStart,
            onDragEnd: handleDragEnd,
          }}
        />
      ))}
    </>
  );
}
