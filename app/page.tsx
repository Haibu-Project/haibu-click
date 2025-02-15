"use client";

import { useState } from "react";
import Hexagons from "./components/Hexagons";
import Bee from "./components/Bee";

export default function Home() {
  const [frame, setFrame] = useState(0);

  const handleClick = () => {
    setFrame((prevFrame) => prevFrame + 1);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden" onClick={handleClick}>
      {/* Contenedor para el título y las partículas */}
      <div className="relative w-full h-full">
        {/* Título */}
        {/* Componente de fondo de hexagonos */}
        <Hexagons/>
        {/* Componente de la abeja */}
        <Bee frame={frame}/>
      </div>
    </div>
  );
}
