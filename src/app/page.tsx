"use client";
import Game from "@/components/features/game/Game";
import { useAddress } from "@chopinframework/react";
import { useRouter } from "next/navigation";


export default function Home() {

  const { address, isLoading } = useAddress();

  console.log(address)

  const router = useRouter();

    if (!address && !isLoading) {
      router.push("/auth/login"); 
    }

  return (
    <Game walletAddress={address}/>
  );

}
