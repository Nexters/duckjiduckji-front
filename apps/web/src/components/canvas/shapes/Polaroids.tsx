import { IPolaroid } from 'web/src/shared/types';
import { Polaroid } from 'web/src/components/canvas/shapes/Polaroid';

interface Props {
  polaroids: IPolaroid[];
  isDraggable: boolean;
}

export function Polaroids({ polaroids, isDraggable }: Props) {
  return (
    <>
      {polaroids.map(polaroid => (
        <Polaroid
          key={polaroid.id}
          {...{
            polaroid,
            isDraggable,
            onTextAreaDoubleClick: () => {},
            onDragStart: () => {},
            onDragEnd: () => {},
          }}
        />
      ))}
    </>
  );
}
