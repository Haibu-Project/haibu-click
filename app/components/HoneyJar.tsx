import { useEffect, useState } from "react";
import Image from "next/image";
import honeyJarImage from "../assets/tarro-miel.png";

interface HoneyJarProps {
  onCatch: (id: number) => void;
  id: number;
}

const HoneyJar: React.FC<HoneyJarProps> = ({ onCatch, id }) => {
  const [position, setPosition] = useState({ top: `${Math.random() * 100}%`, left: "100%" });

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
          beeRect.x < jarRect.x + jarRect.width &&
          beeRect.x + beeRect.width > jarRect.x &&
          beeRect.y < jarRect.y + jarRect.height &&
          beeRect.y + beeRect.height > jarRect.y
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
      }}
    >
      <Image src={honeyJarImage} alt="Honey Jar" layout="fill" objectFit="contain" />
    </div>
  );
};

export default HoneyJar;
