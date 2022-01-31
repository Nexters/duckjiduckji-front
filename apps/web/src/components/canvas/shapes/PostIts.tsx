import { IPostIt } from 'web/src/shared/types';
import { PostIt } from 'web/src/components/canvas/shapes';

interface Props {
  postIts: IPostIt[];
  isDraggable: boolean;
}

export function PostIts({ postIts, isDraggable }: Props) {
  return (
    <>
      {postIts.map(postIt => (
        <PostIt
          key={postIt.id}
          {...{
            postIt,
            isDraggable,
            onDragStart: () => {},
            onDragEnd: () => {},
          }}
        />
      ))}
    </>
  );
}
