import { Image } from 'react-konva';
import { URLImage } from './shapes';

interface Props {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export function Background({ src, x = 0, y = 0, width, height }: Props) {
  return (
    <URLImage
      {...{
        src,
        x,
        y,
        width,
        height,
        fillSpace: true,
      }}
    />
  );
}
