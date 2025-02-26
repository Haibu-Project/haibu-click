"use client";

import { useState } from "react";
import { useUserStore } from "@/store/user-store";
import { useAddress } from "@chopinframework/react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { SimpleButton } from "@/components/magicui/simple-button";
import useFormSetter from "@/hooks/useFormSetter";

export default function RegisterComponent() {
  const [formState, createFormSetter] = useFormSetter({ name: "", surname: "", email: "", username: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { setUser } = useUserStore();
  const { login } = useAddress();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setUser({ name: formState.name, surnames: formState.surname, username: formState.username, email: formState.email });
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
        <form onSubmit={handleRegister} className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mt-4">
          <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={formState.name}
            onChange={(e) => createFormSetter("name")(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#ffc530]"
            required
          />
          <input
            type="text"
            placeholder="Enter your surname"
            value={formState.surname}
            onChange={(e) => createFormSetter("surname")(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#ffc530]"
            required
          />
          <input
            type="text"
            placeholder="Enter your username"
            value={formState.username}
            onChange={(e) => createFormSetter("username")(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#ffc530]"
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={formState.email}
            onChange={(e) => createFormSetter("email")(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#ffc530]"
            required
          />
          <div className="flex justify-center">
            <SimpleButton isLoading={isLoading}>Continue</SimpleButton>
          </div>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </form>
      </div>
    </BlurFade>
  );
}
