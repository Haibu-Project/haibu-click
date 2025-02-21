"use client";
import { useState } from "react";

export default function TestPage() {
  const [message, setMessage] = useState("");

  const handleTest = async () => {
    const res = await fetch("/_chopin/login");
    if (res.ok) {
      const data = await res.json();
      console.log("Test API response:", data);
      setMessage(data.message);
    } else {
      setMessage("Error calling the API");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Test API</h1>
        <button
          onClick={handleTest}
          className="w-full bg-indigo-500 text-white p-3 rounded hover:bg-indigo-600 transition-colors"
        >
          Call Test API
        </button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}
