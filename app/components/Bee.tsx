import { useState } from "react";

export default function Bee({ frame }: { frame: number }) {
  const frames = ["f1", "f2", "f3"]; // Puedes agregar más frames aquí

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(2)",
        cursor: "pointer",
        transition: "transform 0.5s",
      }}
    >
      {frames[frame % frames.length]}
    </div>
  );
}
