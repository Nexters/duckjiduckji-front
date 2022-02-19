import { useEffect, useRef, useState } from 'react';
import { Image } from 'react-konva';

interface Props {
  src: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export const URLImage = ({ src, x, y, width, height }: Props) => {
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);
  const loadImage = () => {
    const img = new window.Image();
    img.src = src;
    img.crossOrigin = 'Anonymous';
    imageRef.current = img;
    imageRef.current.addEventListener('load', handleLoad);
  };

  const handleLoad = () => {
    setImage(imageRef.current);
  };

  useEffect(() => {
    loadImage();
    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener('load', handleLoad);
      }
    };
  }, []);

  useEffect(() => {
    loadImage();
  }, [src]);

  const aspectRatioHeight = width * ((image?.height ?? 1) / (image?.width ?? 1));

  return <Image alt="" x={x} y={y} width={width} height={aspectRatioHeight} image={image} draggable={true} />;
};
