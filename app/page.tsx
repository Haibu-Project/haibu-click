"use client";

import Hexagons from "./components/Hexagons";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* Contenedor para el título y las partículas */}
      <div className="relative w-full h-full">
        {/* Título */}
        
        
        {/* Componente de fondo de hexagonos */}
        <Hexagons/>
      </div>
      
    </div>
  );
}
