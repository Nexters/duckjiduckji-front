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
  const [displaySize, setDisplaySize] = useState({ width: 300, height: 300 });
  const loadImage = () => {
    const img = new window.Image();
    img.src = src;
    imageRef.current = img;
    imageRef.current.addEventListener('load', handleLoad);
  };

  const calculateDisplaySize = () => {
    const aspectRatio = imageRef.current.width / imageRef.current.height;
    const heightDiff = height - imageRef.current.height;
    const widthDiff = width - imageRef.current.width;
    if (heightDiff > widthDiff) setDisplaySize({ width: height * aspectRatio, height });
    else setDisplaySize({ width, height: width / aspectRatio });
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

  useEffect(() => {
    calculateDisplaySize();
  }, [width, height]);

  // const aspectRatioHeight = Math.min(width * ((image?.height ?? 1) / (image?.width ?? 1)), height);

  return <Image alt="" x={x} y={y} width={displaySize.width} height={displaySize.height} image={image} />;
};
