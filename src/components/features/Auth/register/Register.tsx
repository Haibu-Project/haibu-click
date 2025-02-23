import { useState } from "react";
import { useRouter } from "next/navigation";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { SimpleButton } from "@/components/magicui/simple-button";
import { ShinyButton } from "@/components/magicui/shiny-button";
import useFormSetter from "@/hooks/useFormSetter";

export default function RegisterComponent() {
  const [formState, createFormSetter] = useFormSetter({ email: "", username: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      const res = await fetch("/api/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formState.email }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("verificationCode", data.code);
        router.push(`/auth/verify-code?email=${formState.email}&username=${formState.username}`);
      } else {
        setMessage("Error sending the code. Please try again.");
      }
    } catch (error) {
      console.error("Error in send-code:", error);
      setMessage("Request error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
            <SimpleButton isLoading={isLoading} onClick={handleSendCode}>
              Continue
            </SimpleButton>
          </div>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
          <div className="mt-2 border-t pt-4 text-center">
            <ShinyButton>Sign In</ShinyButton>
          </div>
        </form>
      </div>
    </BlurFade>
  );
}
