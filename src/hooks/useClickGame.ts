import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Oracle } from "@chopinframework/next";

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
    const timestamp = await Date.now();

    socket.emit("click", { walletAddress, isJar, timestamp });
  }

  return { score, sendClick };
}
