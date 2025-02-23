import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { setVerificationCode } from "@/utils/redis"; // 🔥 Importamos Redis

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email requerido" });

    const cleanedEmail = email.trim().toLowerCase();
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await setVerificationCode(cleanedEmail, code, 300); // ✅ Guardamos en Redis (expira en 5 min)
    console.log(`Código guardado en Redis para ${cleanedEmail}: ${code}`);

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: process.env.EMAIL_SERVER_PORT === "465",
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: cleanedEmail,
      subject: "Código de verificación",
      text: `Tu código de verificación es: ${code}`,
      html: `<p>Tu código de verificación es: <strong>${code}</strong></p>`,
    });

    console.log(`Código enviado a ${cleanedEmail}`);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error en send-code:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
