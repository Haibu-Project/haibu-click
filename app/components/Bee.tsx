import { useState, useEffect } from "react";
import Image from "next/image";
import frame1 from "../assets/pixil-frame-0_final.png";
import frame2 from "../assets/pixil-frame-1_final.png";

interface BeeProps {
  frame: number;
}

const Bee: React.FC<BeeProps> = ({ frame }) => {
  const frames = [frame1, frame2]; 
  const [position, setPosition] = useState({ top: "50%", left: "50%" });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({
        top: `${event.clientY + 20}px`, // Offset the bee 20px below the mouse
        left: `${event.clientX - 20}px`, // Offset the bee 20px to the left of the mouse
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      id="bee-container"
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        transform: "translate(-50%, -50%)",
        cursor: "pointer",
        transition: "top 0.7s, left 0.7s",
        width: "130px", // Fixed width
        height: "150px", // Fixed height
      }}
    >
      <Image src={frames[frame % frames.length]} alt="Bee frame" layout="fill" objectFit="contain" />
    </div>
  );
};

export default Bee;
