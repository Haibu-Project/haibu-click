import React, { useRef, useEffect } from 'react';

type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;

interface GridOffset {
  x: number;
  y: number;
}

interface HexagonsProps {
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
  speed?: number;
  borderColor?: CanvasStrokeStyle;
  hexSize?: number;
}

const Hexagons: React.FC<HexagonsProps> = ({
  direction = 'left',
  speed = 1,
  borderColor = '#999',
  hexSize = 40,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawHexagon = (x: number, y: number) => {
      const a = (2 * Math.PI) / 6;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        ctx.lineTo(
          x + hexSize * Math.cos(a * i),
          y + hexSize * Math.sin(a * i)
        );
      }
      ctx.closePath();
      ctx.strokeStyle = borderColor;
      ctx.stroke();
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const hexHeight = Math.sin(Math.PI / 3) * hexSize;
      const hexWidth = 2 * hexSize;
      const vertDist = hexHeight * 2;
      const horizDist = hexWidth;

      for (let y = -hexHeight; y < canvas.height + hexHeight; y += vertDist) {
        for (let x = -hexWidth; x < canvas.width + hexWidth; x += horizDist) {
          const offsetX = (y / vertDist) % 2 === 0 ? 0 : horizDist / 2;
          const hexX = x + offsetX - (gridOffset.current.x % horizDist);
          const hexY = y - (gridOffset.current.y % vertDist);

          drawHexagon(hexX, hexY);
        }
      }
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      const hexHeight = Math.sin(Math.PI / 3) * hexSize;
      const hexWidth = 2 * hexSize;
      const vertDist = hexHeight * 2;
      const horizDist = hexWidth;

      switch (direction) {
        case 'right':
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + horizDist) % horizDist;
          break;
        case 'left':
          gridOffset.current.x =
            (gridOffset.current.x + effectiveSpeed + horizDist) % horizDist;
          break;
        case 'up':
          gridOffset.current.y =
            (gridOffset.current.y + effectiveSpeed + vertDist) % vertDist;
          break;
        case 'down':
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + vertDist) % vertDist;
          break;
        case 'diagonal':
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + horizDist) % horizDist;
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + vertDist) % vertDist;
          break;
        default:
          break;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [direction, speed, borderColor, hexSize]);

  return <canvas ref={canvasRef} className="w-full h-full border-none block"></canvas>;
};

export default Hexagons;
