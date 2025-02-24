"use client";
import Game from "@/components/features/game/Game";
import { useAddress } from "@chopinframework/react";

export default function Home() {
  const { address } = useAddress();
  return (
    <Game walletAddress={address}/>
  );
}
