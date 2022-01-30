import { IPolaroid } from 'web/shared/types';
import { Polaroid } from 'web/components/canvas/shapes/Polaroid';
import { useCanvasDragEvent } from 'web/shared/hooks';

interface Props {
  polaroids: IPolaroid[];
}

export function Polaroids({ polaroids }: Props) {
  const { handleDragStart, handleDragEnd } = useCanvasDragEvent();

  return (
    <>
      {polaroids.map(polaroid => (
        <Polaroid
          key={polaroid.id}
          {...{
            polaroid,
            onTextAreaDoubleClick: () => {},
            onDragStart: handleDragStart,
            onDragEnd: handleDragEnd,
          }}
        />
      ))}
    </>
  );
}
