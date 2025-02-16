import { useState, useEffect } from "react";
import Image from "next/image";
import frame1 from "../assets/pixil-frame-0_final.png";
import frame2 from "../assets/pixil-frame-1_final.png";

interface BeeProps {
  frame: number;
  lift: boolean;
  setLift: (lift: boolean) => void;
}

const Bee: React.FC<BeeProps> = ({ frame, lift, setLift }) => {
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
      const windowWidth = window.innerWidth;
      const maxLeft = windowWidth * 3 / 4 - 65; // 3/4 of the window width minus half the bee width

      setPosition((prevPosition) => ({
        ...prevPosition,
        left: Math.min(event.clientX - 20, maxLeft), // Offset the bee 20px to the left of the mouse and limit to maxLeft
      }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVelocity((prevVelocity) => prevVelocity + gravity);
      setPosition((prevPosition) => ({
        ...prevPosition,
        top: Math.min(prevPosition.top + velocity, window.innerHeight - 150), // Prevent bee from falling below the screen
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [velocity, gravity]);

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
        width: "170px", // Fixed width
        height: "150px", // Fixed height
        userSelect: "none", // Prevent selection
      }}
    >
      <Image src={frames[frame % frames.length]} alt="Bee frame" layout="fill" objectFit="contain" />
    </div>
  );
};

export default Bee;
