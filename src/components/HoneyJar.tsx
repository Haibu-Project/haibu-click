import { useEffect, useState } from "react";
import Image from "next/image";
import honeyJarImage from "../assets/Honey-Jar.png";

interface HoneyJarProps {
  onCatch: (id: number) => void;
  id: number;
}

const HoneyJar: React.FC<HoneyJarProps> = ({ onCatch, id }) => {
  const [position, setPosition] = useState({ top: `${20 + Math.random() * 60}%`, left: "100%" });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        const newLeft = parseFloat(prevPosition.left) - 1;
        if (newLeft < -10) {
          clearInterval(interval);
          return prevPosition; // Do not call onCatch if the jar is out of bounds
        }
        return { ...prevPosition, left: `${newLeft}%` };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    const checkCollision = () => {
      const beeElement = document.getElementById("bee-container");
      const jarElement = document.getElementById(`honey-jar-${id}`);
      if (beeElement && jarElement) {
        const beeRect = beeElement.getBoundingClientRect();
        const jarRect = jarElement.getBoundingClientRect();
        if (
          beeRect.left < jarRect.left + jarRect.width &&
          beeRect.left + beeRect.width > jarRect.left &&
          beeRect.top < jarRect.top + jarRect.height &&
          beeRect.top + beeRect.height > jarRect.top
        ) {
          onCatch(id);
        }
      }
    };

    const interval = setInterval(checkCollision, 50);
    return () => clearInterval(interval);
  }, [id, onCatch]);

  return (
    <div
      id={`honey-jar-${id}`}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        transform: "translate(-50%, -50%)",
        cursor: "pointer",
        width: "70px",
        height: "70px",
        userSelect: "none", 
      }}
    >
      <Image src={honeyJarImage} alt="Honey Jar" layout="fill" objectFit="contain" draggable="false" />
    </div>
  );
};

export default HoneyJar;
