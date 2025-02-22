"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import haibuLogo from "../assets/LogoHaibu.jpg";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { InfiniteBeeAllFrames } from "../../components/magicui/infinite-bee-all-frames";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { SimpleButton } from "@/components/magicui/simple-button";
import { Confetti, ConfettiRef } from "@/components/magicui/confetti";

export default function LoginPage() {
  const [step, setStep] = useState<"email" | "code" | "register" | "registered">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const confettiRef = useRef<ConfettiRef>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause background animations
        document.querySelectorAll(".background-animation").forEach((el) => {
          (el as HTMLElement).style.animationPlayState = "paused";
        });
      } else {
        // Resume background animations
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

  // Envía el código al email
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStep("code");
        setMessage("");
      } else {
        setMessage("Error sending the code.");
      }
    } catch (error) {
      console.error("Error in send-code:", error);
      setMessage("Request error.");
    } finally {
      setIsLoading(false);
    }
  };

  // Verifica el código y si es correcto, llama a la API de Chopin y luego registra al usuario
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const verifyRes = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      if (verifyRes.ok) {
        // Código verificado, ahora llamamos a la API de Chopin
        const loginRes = await fetch("http://localhost:4000/_chopin/login");
        if (loginRes.ok) {
          const data = await loginRes.json();
          console.log("Response from _chopin/login:", data);

          // Ahora registramos al usuario con el email, username y address
          const registerRes = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, username, address: data.address }),
          });
          if (registerRes.ok) {
            const registerData = await registerRes.json();
            setResult(registerData.user);
            setStep("registered");
            setMessage("");
            confettiRef.current?.fire({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          } else {
            setMessage("Error registering the user.");
          }
        } else {
          setMessage("Error calling the Chopin API");
        }
      } else {
        setMessage("Incorrect or expired code");
      }
    } catch (error) {
      console.error("Error in verify-code:", error);
      setMessage("Verification error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#d58a00] to-[#ff9603] p-4">
      {step === "registered" && <Confetti ref={confettiRef} />}
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
      {step === "email" && (
        <BlurFade className="z-10">
          <div className="relative rounded-lg">
            <BorderBeam className="rounded-lg" />
            <form
              onSubmit={handleSendCode}
              className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full"
            >
              <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#e39500]"
                required
              />
              <div className="flex justify-center">
                <SimpleButton isLoading={isLoading}>
                  Send Code
                </SimpleButton>
              </div>
              {message && <p className="mt-4 text-center text-red-500">{message}</p>}
              <div className="mt-2 border-t pt-4 text-center">
                <ShinyButton onClick={() => setStep("register")}>Register</ShinyButton>
              </div>
            </form>
          </div>
        </BlurFade>
      )}

      {step === "register" && (
        <BlurFade className="z-10">
          <div className="relative rounded-lg">
            <BorderBeam className="rounded-lg" />
            <form
              onSubmit={handleSendCode}
              className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mt-4"
            >
              <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#ffc530]"
                required
              />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#ffc530]"
                required
              />
              <div className="flex justify-center">
                <SimpleButton isLoading={isLoading}>
                  Continue
                </SimpleButton>
              </div>
              {message && <p className="mt-4 text-center text-red-500">{message}</p>}
              <div className="mt-2 border-t pt-4 text-center">
                <ShinyButton onClick={() => setStep("email")}>Sign In</ShinyButton>
              </div>
            </form>
          </div>
        </BlurFade>
      )}

      {step === "code" && (
        <BlurFade className="z-10">
          <div className="relative rounded-lg">
            <BorderBeam className="rounded-lg" />
            <form
              onSubmit={handleVerifyCode}
              className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mt-4"
            >
              <h1 className="text-3xl font-bold text-center mb-6">Verify Code</h1>
              <p className="mb-4 text-center">
                A code has been sent to <strong>{email}</strong>
              </p>
              <input
                type="text"
                placeholder="Enter the verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#ffc530]"
                required
              />
              <div className="flex justify-center">
                <SimpleButton isLoading={isLoading}>
                  Verify Code
                </SimpleButton>
              </div>
              {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </form>
          </div>
        </BlurFade>
      )}

      {step === "registered" && (
        <BlurFade className="mt-8 z-10">
          <div className="relative rounded-lg">
            <BorderBeam className="rounded-lg" />
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Welcome, {username}!</h2>
              <div className="bg-gray-100 p-4 rounded mb-4">
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Username:</strong> {username}</p>
                <p><strong>Address:</strong> {result?.address}</p>
              </div>
              <div className="flex justify-center">
                <SimpleButton onClick={() => router.push("/")} isLoading={isLoading}>
                  Start Playing
                </SimpleButton>
              </div>
            </div>
          </div>
        </BlurFade>
      )}
    </div>
  );
}