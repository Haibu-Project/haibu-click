import React, { useEffect, useState } from 'react';
import backgroundImage from "../assets/fondo-colmena.jpg";

interface HexagonsProps {
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
  speed?: number;
}

const Hexagons: React.FC<HexagonsProps> = ({
  direction = 'left',
  speed = 1,
}) => {
  const [backgroundPosition, setBackgroundPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundPosition((prevPosition) => (prevPosition - speed) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div
      className="w-full h-full"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundPosition: `${backgroundPosition}% 0`,
        backgroundRepeat: "repeat-x",
        backgroundSize: "cover",
      }}
    />
  );
};

export default Hexagons;
