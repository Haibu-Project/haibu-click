import { useState, useEffect } from "react";
import frame1 from "../assets/pixil-frame-0.png";
import frame2 from "../assets/pixil-frame-1.png";

export default function Bee({ frame }: { frame: number }) {
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
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        transform: "translate(-50%, -50%) scale(2)",
        cursor: "pointer",
        transition: "top 0.5s, left 0.5s, transform 0.5s",
      }}
    >
      <img src={frames[frame % frames.length].src} alt="Bee frame" />
    </div>
  );
}
