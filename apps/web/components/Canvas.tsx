import { useEffect, useRef, useState } from "react";

interface Props {}

function Canvas({}: Props) {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2.5;
    ctxRef.current = ctx;
  }, []);

  function startDrawing() {
    setIsDrawing(true);
  }

  function finishDrawing() {
    setIsDrawing(false);
  }

  function draw(e) {
    console.log(e);
  }

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      onMouseLeave={finishDrawing}
    ></canvas>
  );
}

export default Canvas;
