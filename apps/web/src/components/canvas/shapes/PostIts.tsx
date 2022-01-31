import { IPostIt } from 'web/src/shared/types';
import { PostIt } from 'web/src/components/canvas/shapes';

interface Props {
  postIts: IPostIt[];
}

export function PostIts({ postIts }: Props) {
  return (
    <>
      {postIts.map(postIt => (
        <PostIt
          key={postIt.id}
          {...{
            postIt,
            onDragStart: () => {},
            onDragEnd: () => {},
          }}
        />
      ))}
    </>
  );
}
