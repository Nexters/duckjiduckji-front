import { MouseEvent, useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";

interface Props {}

function Canvas({}: Props) {
  const { width, height } = useWindowSize();
  const [isDrawing, setIsDrawing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D>(null);

  const [lines, setLines] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const scale = window.devicePixelRatio;
      canvas.width = Math.floor(width * scale);
      canvas.height = Math.floor(height * scale);
      ctx.scale(scale, scale);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctxRef.current = ctx;
    }
  }, [width, height]);

  function startDrawing() {
    setIsDrawing(true);
  }

  function finishDrawing() {
    setIsDrawing(false);
  }

  function drawLine(e: MouseEvent<HTMLCanvasElement>) {
    const { clientX, clientY } = e;
    const ctx = ctxRef.current;

    if (ctxRef.current) {
      if (isDrawing) {
        ctx.lineTo(clientX, clientY);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(clientX, clientY);
      }
    }
  }

  return (
    <div ref={containerRef}>
      <canvas
        style={{ width: width ?? 300, height: height ?? 300 }}
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={drawLine}
        onMouseLeave={finishDrawing}
      ></canvas>
      <button
        onClick={() => ctxRef.current.scale(2, 2)}
        style={{ position: "fixed", top: 0, left: 0 }}
      >
        CLICK
      </button>
    </div>
  );
}

export default Canvas;
