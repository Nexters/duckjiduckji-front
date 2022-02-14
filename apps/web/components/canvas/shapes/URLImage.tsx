import { useEffect, useRef, useState } from 'react';
import { Image } from 'react-konva';

export const URLImage = ({ src, x, y }) => {
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

  return <Image alt="" x={x} y={y} image={image} />;
};
