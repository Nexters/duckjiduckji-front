import { Image } from 'react-konva';
import { URLImage } from './shapes';

interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function Background({ x, y, width, height }: Props) {
  return (
    <URLImage
      {...{
        src: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80',
        x,
        y,
        width,
        height,
        fillSpace: true,
      }}
    />
  );
}
