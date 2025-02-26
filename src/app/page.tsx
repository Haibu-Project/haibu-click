"use client";
import { useEffect } from "react"; 
import Game from "@/components/features/game/Game";
import { useAddress } from "@chopinframework/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { address, isLoading } = useAddress();
  const router = useRouter();

  console.log(address);

  useEffect(() => {
    if (!address && !isLoading) {
      router.push("/auth/login");
    }
  }, [address, isLoading, router]);

  if (!address && isLoading) {
    return <div>Loading...</div>;
  }

  return <Game />;
}