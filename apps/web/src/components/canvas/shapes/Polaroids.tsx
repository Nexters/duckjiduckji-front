import { IPolaroid } from 'web/src/shared/types';
import { Polaroid } from 'web/src/components/canvas/shapes/Polaroid';
import { useRecoilState } from 'recoil';
import { userActionState } from '../../../atoms';

interface Props {
  polaroids: IPolaroid[];
}

export function Polaroids({ polaroids }: Props) {
  const [action, setAction] = useRecoilState(userActionState);
  console.log(action);
  return (
    <>
      {polaroids.map(polaroid => (
        <Polaroid
          key={polaroid.id}
          {...{
            polaroid,
            onTextAreaDoubleClick: () => {},
            onDragStart: () => {},
            onDragEnd: () => {},
          }}
        />
      ))}
    </>
  );
}
