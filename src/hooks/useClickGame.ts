import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("wss://haibu-backend-production.up.railway.app", {
  transports: ["websocket"],
});

export function useClickGame(email: string) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    socket.on("updateScore", (data) => {
      if (data.email === email) {
        setScore(data.totalScore);
      }
    });

    return () => {
      socket.off("updateScore");
    };
  }, [email]);

  async function sendClick(isJar: boolean = false) {
    const timestamp = await Date.now();

    socket.emit("click", { email, isJar, timestamp });
  }

  return { score, sendClick };
}
