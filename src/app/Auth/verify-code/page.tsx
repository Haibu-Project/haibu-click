"use client";
import { useEffect } from "react";
import VerifyCode from "@/components/features/Auth/register/VerifyCode";

export default function VerifyCodePage() {

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

  return <VerifyCode />;
}
