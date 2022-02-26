import { Image } from 'react-konva';
import useImage from 'use-image';

interface Props {
  x: number;
  y: number;
  src: string;
}

export function SimpleImage({ x, y, src }: Props) {
  const [image] = useImage(src);
  return <Image draggable x={x} y={y} image={image} />;
}
