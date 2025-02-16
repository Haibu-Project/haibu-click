"use client";

import { useState, useEffect } from "react";
import Hexagons from "./components/Hexagons";
import Bee from "./components/Bee";
import HoneyJar from "./components/HoneyJar";
import ScoreBoard from "./components/ScoreBoard";

export default function Home() {
  const [frame, setFrame] = useState(0);
  const [score, setScore] = useState(0);
  const [jars, setJars] = useState<number[]>([]);
  const [isWindowFocused, setIsWindowFocused] = useState(true);

  const handleClick = () => {
    setFrame((prevFrame) => prevFrame + 1);
    setScore((prevScore) => prevScore + 1); // Increment score by 1 for each click
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
    <div className="relative w-full h-screen overflow-hidden" onClick={handleClick}>
      {/* Contenedor para el título y las partículas */}
      <div className="relative w-full h-full">
        {/* Título */}
        <ScoreBoard score={score} />
        {/* Componente de fondo de hexagonos */}
        <Hexagons />
        {/* Componente de la abeja */}
        <Bee frame={frame} />
        {/* Componentes de los tarros de miel */}
        {jars.map((id) => (
          <HoneyJar key={id} id={id} onCatch={handleCatch} />
        ))}
      </div>
    </div>
  );
}
