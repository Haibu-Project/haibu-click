"use client";
import Game from "@/components/features/game/Game";
import { useAddress } from "@chopinframework/react";

export default function Home() {
  const { address, isLoading, isLoginError, login, logout, revalidate } = useAddress();
  return (
    <Game walletAddress={address}/>
  );
}
