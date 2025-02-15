import { useState, useEffect } from "react";
import frame1 from "../assets/pixil-frame-0_final.png";
import frame2 from "../assets/pixil-frame-1_final.png";

interface BeeProps {
  frame: number;
}

const Bee: React.FC<BeeProps> = ({ frame }) => {
  const frames = [frame1, frame2]; // Import the frames from assets
  const [position, setPosition] = useState({ top: "50%", left: "50%" });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({
        top: `${event.clientY}px`,
        left: `${event.clientX}px`,
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
        transition: "top 0.5s, left 0.5s",
        width: "150px", // Fixed width
        height: "150px", // Fixed height
      }}
    >
      <img src={frames[frame % frames.length].src} alt="Bee frame" style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default Bee;
