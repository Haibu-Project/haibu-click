import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, username, address } = req.body;
  if (!email || !username || !address) return res.status(400).json({ error: "Email, username, and address are required" });

  try {
    // Aquí tiene que ir la lógica para registrar al usuario en la base de datos

    // Simulación de registro exitoso
    const user = { email, username, address, id: Date.now() };

    // Devuelve una respuesta exitosa
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Error registering the user" });
  }
}