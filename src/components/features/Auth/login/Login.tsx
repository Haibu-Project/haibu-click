"use client";

import { useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { SimpleButton } from "@/components/magicui/simple-button";
import { ShinyButton } from "@/components/magicui/shiny-button";
import useFormSetter from "@/hooks/useFormSetter";
import Link from "next/link";
import { useUserStore } from "@/store/user-store";
import { useAddress } from "@chopinframework/react";

export default function Login() {
  const [formState, createFormSetter] = useFormSetter({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { setUser } = useUserStore();
  const { login } = useAddress();


  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setUser({ email: formState.email });
      login();
    } catch (error) {
      console.error("Redirect error:", error);
      setMessage("Error redirecting to authentication.");
      setIsLoading(false);
    }
  };

  return (
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
            value={formState.email}
            onChange={(e) => createFormSetter("email")(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#e39500]"
            required
          />
          <div className="flex justify-center">
            <SimpleButton isLoading={isLoading}>Send Code</SimpleButton>
          </div>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
          <div className="mt-2 border-t pt-4 text-center">
            <Link href="/auth/register">
              <ShinyButton>
                Register
              </ShinyButton>
            </Link>
          </div>
        </form>
      </div>
    </BlurFade>
  );
}
