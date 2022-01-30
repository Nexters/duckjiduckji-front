import { IPolaroid } from 'web/shared/types';
import { Polaroid } from 'web/components/canvas/shapes/Polaroid';
import { useCanvasDragEvents } from 'web/shared/hooks/useCanvasDragEvents';

interface Props {
  polaroids: IPolaroid[];
}

export function Polaroids({ polaroids }: Props) {
  const { handleDragStart, handleDragEnd } = useCanvasDragEvents();

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
