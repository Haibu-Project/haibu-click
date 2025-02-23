import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { SimpleButton } from "@/components/magicui/simple-button";
import useFormSetter from "@/hooks/useFormSetter";


export default function VerifyCode() {
  const [formState, createFormSetter] = useFormSetter({ email: "", code: "", username: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.email) {
      createFormSetter("email")(router.query.email as string);
      const storedCode = localStorage.getItem("verificationCode");
      if (storedCode) {
        createFormSetter("code")(storedCode);
      }
    }
  }, [router.query]);

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const verifyRes = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formState.email, code: formState.code }),
      });
      if (verifyRes.ok) {
        const loginRes = await fetch("/_chopin/login");
        if (loginRes.ok) {
          const data = await loginRes.json();
          console.log("Response from _chopin/login:", data);

          const registerRes = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formState.email, username: formState.username, address: data.address }),
          });
          if (registerRes.ok) {
            const registerData = await registerRes.json();
            setResult(registerData.user);
            setMessage("");
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
    <BlurFade className="z-10">
      <div className="relative rounded-lg">
        <BorderBeam className="rounded-lg" />
        <form
          onSubmit={handleVerifyCode}
          className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mt-4"
        >
          <h1 className="text-3xl font-bold text-center mb-6">Verify Code</h1>
          <p className="mb-4 text-center">
            A code has been sent to <strong>{formState.email}</strong>
          </p>
          <input
            type="text"
            placeholder="Enter the verification code"
            value={formState.code}
            onChange={(e) => createFormSetter("code")(e.target.value)}
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
  );
}
