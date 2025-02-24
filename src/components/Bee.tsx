import { useState, useEffect } from "react";
import frame1 from "../assets/Bee-frame1.png";
import frame2 from "../assets/Bee-frame2.png";


interface BeeProps {
  frame: number;
  lift: boolean;
  setLift: (lift: boolean) => void;
  onFall: () => void;
  isPaused: boolean;
}

const Bee: React.FC<BeeProps> = ({ frame, lift, setLift, onFall, isPaused }) => {
  const frames = [frame1, frame2]; 
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [velocity, setVelocity] = useState(0);
  const gravity = 1.5; 
  const liftForce = -10;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPosition({ top: window.innerHeight / 2, left: window.innerWidth / 2 });
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isPaused) return;

      const windowWidth = window.innerWidth;
      const maxLeft = windowWidth * 3 / 4 - 65; 

      setPosition((prevPosition) => ({
        ...prevPosition,
        left: Math.min(event.clientX - 20, maxLeft), 
      }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isPaused]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setVelocity((prevVelocity) => prevVelocity + gravity);
      setPosition((prevPosition) => {
        const newTop = prevPosition.top + velocity;
        if (newTop >= window.innerHeight) {
          onFall(); 
        }
        return { ...prevPosition, top: newTop };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [velocity, gravity, onFall, isPaused]);

  useEffect(() => {
    if (lift) {
      setVelocity(liftForce);
      setLift(false);
    }
  }, [lift, setLift, liftForce]);

  return (
    <div
      id="bee-container"
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        transform: "translate(-50%, -50%)",
        cursor: "pointer",
        transition: "top 0.05s, left 0.7s",
        width: "170px", 
        height: "150px", 
        userSelect: "none", 
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={frames[frame % frames.length].src} alt="Bee frame" style={{ width: "100%", height: "100%", pointerEvents: "none", userSelect: "none" }} draggable="false" />
    </div>
  );
};

export default Bee;