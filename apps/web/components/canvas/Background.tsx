import { Image } from 'react-konva';
import { URLImage } from './shapes';

interface Props {
  width: number;
  height: number;
}

export function Background({ width, height }: Props) {
  return (
    <URLImage
      {...{
        src: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80',
        x: 0,
        y: 0,
        width,
        height,
        fillSpace: true,
      }}
    />
  );
}
