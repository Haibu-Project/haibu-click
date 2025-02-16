"use client";

import { useState, useEffect } from "react";
import Hexagons from "./components/Hexagons";
import Bee from "./components/Bee";
import HoneyJar from "./components/HoneyJar";
import ScoreBoard from "./components/ScoreBoard";
import Leaderboard from "./components/Leaderboard";

const mockScores = [
  { name: "Player1", score: 150 },
  { name: "Player2", score: 120 },
  { name: "Player3", score: 100 },
  { name: "Player4", score: 80 },
  { name: "Player5", score: 60 },
];

export default function Home() {
  const [frame, setFrame] = useState(0);
  const [score, setScore] = useState(0);
  const [jars, setJars] = useState<number[]>([]);
  const [isWindowFocused, setIsWindowFocused] = useState(true);
  const [beeLift, setBeeLift] = useState(false);

  const handleClick = () => {
    setFrame((prevFrame) => prevFrame + 1);
    setScore((prevScore) => prevScore + 1); // Increment score by 1 for each click
    setBeeLift(true); // Trigger bee lift
  };

  const handleCatch = (id: number) => {
    setScore((prevScore) => prevScore + 10);
    setJars((prevJars) => prevJars.filter((jarId) => jarId !== id));
  };

  useEffect(() => {
    const handleFocus = () => setIsWindowFocused(true);
    const handleBlur = () => setIsWindowFocused(false);

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  useEffect(() => {
    if (!isWindowFocused) return;

    const interval = setInterval(() => {
      setJars((prevJars) => [...prevJars, Date.now()]);
    }, 2000);

    return () => clearInterval(interval);
  }, [isWindowFocused]);

  return (
    <div className="relative w-full h-screen overflow-hidden" onMouseDown={handleClick}>
      {/* Contenedor para el título y las partículas */}
      <div className="relative w-full h-full">
        {/* Título */}
        <ScoreBoard score={score} />
        {/* Componente de fondo de hexagonos */}
        <Hexagons />
        {/* Componente de la abeja */}
        <Bee frame={frame} lift={beeLift} setLift={setBeeLift} />
        {/* Componentes de los tarros de miel */}
        {jars.map((id) => (
          <HoneyJar key={id} id={id} onCatch={handleCatch} />
        ))}
        {/* Componente del leaderboard */}
        <Leaderboard scores={mockScores} />
      </div>
    </div>
  );
}
