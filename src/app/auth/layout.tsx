"use client";

import { ReactNode } from "react";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { InfiniteBeeAllFrames } from "@/components/magicui/infinite-bee-all-frames";

interface BackgroundLayoutProps {
  children: ReactNode;
}

export default function BackgroundLayout({ children }: BackgroundLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#d58a00] to-[#ff9603] p-4">
      <RetroGrid
        className="absolute inset-0 z-0 w-full h-full background-animation"
        angle={65}
        cellSize={60}
        opacity={0.5}
        lightLineColor="#ffb920"
        darkLineColor="#d58a00"
      />
      <div className="absolute z-10 top-11">
        <InfiniteBeeAllFrames width={300} height={400} className="opacity-100 background-animation" />
      </div>
      {children}
    </div>
  );
}
