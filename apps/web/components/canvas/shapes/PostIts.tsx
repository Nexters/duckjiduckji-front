import { IPostIt } from 'web/shared/types';
import { PostIt } from 'web/components/canvas/shapes';
import { useCanvasDragEvent } from 'web/shared/hooks';

interface Props {
  postIts: IPostIt[];
}

export function PostIts({ postIts }: Props) {
  const { handleDragStart, handleDragEnd } = useCanvasDragEvent();

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
