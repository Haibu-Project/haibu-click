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

  const handleClick = () => {
    setFrame((prevFrame) => prevFrame + 1);
  };

  const handleCatch = (id: number) => {
    setScore((prevScore) => prevScore + 10);
    setJars((prevJars) => prevJars.filter((jarId) => jarId !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setJars((prevJars) => [...prevJars, Date.now()]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden" onClick={handleClick}>
      {/* Contenedor para el título y las partículas */}
      <div className="relative w-full h-full">
        {/* Título */}
        Haibu
        {/* Componente de fondo de hexagonos */}
        <Hexagons />
        {/* Componente de la abeja */}
        <Bee frame={frame} />
        {/* Componentes de los tarros de miel */}
        {jars.map((id) => (
          <HoneyJar key={id} id={id} onCatch={handleCatch} />
        ))}
        {/* Componente de la tabla de puntaje */}
        <ScoreBoard score={score} />
      </div>
    </div>
  );
}
