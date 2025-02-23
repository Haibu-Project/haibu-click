"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "@/components/features/Auth/login/Login";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.querySelectorAll(".background-animation").forEach((el) => {
          (el as HTMLElement).style.animationPlayState = "paused";
        });
      } else {
        document.querySelectorAll(".background-animation").forEach((el) => {
          (el as HTMLElement).style.animationPlayState = "running";
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <Login />;
}