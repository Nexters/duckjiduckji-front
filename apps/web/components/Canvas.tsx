import { useEffect, useRef } from "react";

interface Props {}

function Canvas({}: Props) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const  =
  }, []);

  return <div></div>;
}

export default Canvas;
