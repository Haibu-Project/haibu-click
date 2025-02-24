"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { SimpleButton } from "@/components/magicui/simple-button";
import useFormSetter from "@/hooks/useFormSetter";

interface FormState {
  email: string;
  code: string;
}

export default function VerifyLogin() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const cleanEmail = searchParams?.get("email") ?? "";

  const [formState, createFormSetter] = useFormSetter<FormState>({
    email: cleanEmail,
    code: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  console.log("Email obtenido:", cleanEmail);

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Verificando código para login:", {
      email: formState.email,
      code: formState.code,
    });

    setIsLoading(true);
    try {
      const verifyRes = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formState.email.trim(),
          code: formState.code.trim(),
        }),
      });

      if (!verifyRes.ok) {
        const errorData = await verifyRes.json();
        setMessage(errorData.error || "Invalid or expired code.");
        return;
      }

      console.log("Código verificado correctamente.");

      const loginRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formState.email.trim(),
        }),
      });

      if (!loginRes.ok) {
        const errorData = await loginRes.json();
        setMessage(errorData.error || "Login failed.");
        return;
      }

      const loginData = await loginRes.json();
      console.log("Login Data:", loginData);

      const walletAddress = loginData.user?.walletAddress;

      if (!walletAddress) {
        setMessage("Error: Wallet address not found.");
        return;
      }

      console.log("Autenticando en Chopin con Wallet:", walletAddress);

      const loginAsRes = await fetch(`/_chopin/login?as=${walletAddress}`);
      if (loginAsRes.ok) {
        console.log("Login con Chopin exitoso!");
        router.push("/");
      } else {
        setMessage("Error al autenticar en Chopin.");
      }
    } catch (error) {
      console.error("Error en verify-login:", error);
      setMessage("Login verification error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BlurFade className="z-10">
      <div className="relative rounded-lg">
        <BorderBeam className="rounded-lg" />
        <form onSubmit={handleVerifyCode} className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mt-4">
          <h1 className="text-3xl font-bold text-center mb-6">Verify Login</h1>
          <p className="mb-4 text-center">
            A code has been sent to <strong>{formState.email}</strong>
          </p>
          <input
            type="text"
            placeholder="Enter your verification code"
            value={formState.code}
            onChange={(e) => createFormSetter("code")(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#ffc530]"
            required
          />
          <div className="flex justify-center">
            <SimpleButton isLoading={isLoading} >Verify</SimpleButton>
          </div>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </form>
      </div>
    </BlurFade>
  );
}
