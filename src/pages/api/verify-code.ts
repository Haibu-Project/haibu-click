import type { NextApiRequest, NextApiResponse } from "next";
import { getVerificationCode, deleteVerificationCode } from "@/utils/redis";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ error: "Email y código requeridos" });

    const cleanedEmail = email.trim().toLowerCase();
    const storedCode = await getVerificationCode(cleanedEmail);

    console.log(`Intentando verificar código para ${cleanedEmail}. Código esperado: ${storedCode}`);
    console.log(storedCode)
    if (storedCode && storedCode === code) {
      await deleteVerificationCode(cleanedEmail);
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ error: "Código incorrecto o expirado" });
    }
  } catch (error) {
    console.error("Error en verify-code:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
