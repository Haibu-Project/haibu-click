import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

let verificationCodes: { [email: string]: string } = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email requerido" });

  // Genera un código de 6 dígitos
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  verificationCodes[email] = code;

  // Configura el transporter de Nodemailer 
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: process.env.EMAIL_SERVER_PORT === "465",
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  } as nodemailer.TransportOptions);

  try {
    // Envía el correo con el código de verificación
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Código de verificación",
      text: `Tu código de verificación es: ${code}`,
      html: `<p>Tu código de verificación es: <strong>${code}</strong></p>`,
    });
    console.log(`Código de verificación para ${email}: ${code}`);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return res.status(500).json({ error: "Error al enviar el correo" });
  }
}

export { verificationCodes };