import type { NextApiRequest, NextApiResponse } from "next";
import { verificationCodes } from "./send-code";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ error: "Email y código requeridos" });

  if (verificationCodes[email] === code) {
    delete verificationCodes[email];
    return res.status(200).json({ success: true });
  } else {
    return res.status(400).json({ error: "Código incorrecto o expirado" });
  }
}
