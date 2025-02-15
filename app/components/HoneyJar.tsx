import { useEffect, useState } from "react";
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
          onCatch(id); // Trigger onCatch to remove the jar
          return { ...prevPosition, left: "100%" };
        }
        return { ...prevPosition, left: `${newLeft}%` };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [id, onCatch]);

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
        width: "50px",
        height: "50px",
      }}
    >
      <img src={honeyJarImage.src} alt="Honey Jar" style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default HoneyJar;
