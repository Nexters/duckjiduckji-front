import { useEffect, useRef, useState } from 'react';
import { Image } from 'react-konva';

interface Props {
  src: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  isFitWidth?: boolean;
}

export const URLImage = ({ src, x = 0, y = 0, width, height, isFitWidth = false }: Props) => {
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);
  const [displaySize, setDisplaySize] = useState({ width: 300, height: 300 });
  const loadImage = () => {
    const img = new window.Image();
    img.src = src;
    imageRef.current = img;
    imageRef.current.addEventListener('load', handleLoad);
    calculateDisplaySize();
  };
  console.dir({ src, x, y, width, height, isFitWidth });
  const calculateDisplaySize = () => {
    if (!imageRef.current) return;
    const aspectRatio = imageRef.current?.width / imageRef.current?.height ?? 0.7;
    if (isFitWidth) {
      console.log(width, aspectRatio);
      const calcHeight = width / aspectRatio;
      console.log(calcHeight);
      const displayHeight = calcHeight > height ? height : calcHeight;
      console.log(width, displayHeight);
      setDisplaySize({ width, height: displayHeight });
    }
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
  }, [width, height, src, x, y]);

  // const aspectRatioHeight = Math.min(width * ((image?.height ?? 1) / (image?.width ?? 1)), height);

  return <Image alt="" x={x} y={y} width={displaySize.width} height={displaySize.height} image={image} />;
};
