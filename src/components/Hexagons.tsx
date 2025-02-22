import React, { useEffect, useState } from 'react';
import backgroundImage from "../assets/Hive-Background.jpg";

interface HexagonsProps {
  speed?: number;
}

const Hexagons: React.FC<HexagonsProps> = ({
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
        userSelect: "none", 
        pointerEvents: "none", 
      }}
    />
  );
};

export default Hexagons;
