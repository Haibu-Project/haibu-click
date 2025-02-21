// pages/login.tsx
"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);
  const router = useRouter();

  // Envía el código al email
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
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
        setMessage("Error al enviar el código.");
      }
    } catch (error) {
      console.error("Error en send-code:", error);
      setMessage("Error en la petición.");
    }
  };

  // Verifica el código y si es correcto, llama a la API de Chopin
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
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
          console.log("Respuesta de _chopin/login:", data);
          setResult(data);
          setMessage("Login exitoso");
        } else {
          setMessage("Error al llamar a la API de Chopin");
        }
      } else {
        setMessage("Código incorrecto o expirado");
      }
    } catch (error) {
      console.error("Error en verify-code:", error);
      setMessage("Error en la verificación.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      {step === "email" && (
        <form
          onSubmit={handleSendCode}
          className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full"
        >
          <h1 className="text-3xl font-bold text-center mb-6">Inicia sesión</h1>
          <input
            type="email"
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white p-3 rounded hover:bg-indigo-600 transition-colors"
          >
            Enviar código
          </button>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </form>
      )}

      {step === "code" && (
        <form
          onSubmit={handleVerifyCode}
          className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mt-4"
        >
          <h1 className="text-3xl font-bold text-center mb-6">Verificar código</h1>
          <p className="mb-4 text-center">
            Se ha enviado un código a <strong>{email}</strong>
          </p>
          <input
            type="text"
            placeholder="Ingresa el código de verificación"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition-colors"
          >
            Verificar código
          </button>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </form>
      )}

      {result && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Datos de Login</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
