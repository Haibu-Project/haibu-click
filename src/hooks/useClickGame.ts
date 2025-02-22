"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Oracle } from "@chopinframework/next"; // Importamos Chopin

const socket = io("wss://haibu-backend-production.up.railway.app", {
  transports: ["websocket"],
});

export function useClickGame(walletAddress: string) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    socket.on("updateScore", (data) => {
      if (data.walletAddress === walletAddress) {
        setScore(data.totalScore);
      }
    });

    return () => {
      socket.off("updateScore");
    };
  }, [walletAddress]);

  async function sendClick(isJar: boolean = false) {
    // 🕒 Obtener timestamp desde Chopin
    const timestamp = await Oracle.now();

    socket.emit("click", { walletAddress, isJar, timestamp });
  }

  return { score, sendClick };
}
