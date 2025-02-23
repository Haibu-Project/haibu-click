import type { NextApiRequest, NextApiResponse } from "next";
import { Oracle } from "@chopinframework/next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") return res.status(405).json({ error: "Método no permitido" });

    console.log("Llamando a Oracle.notarize()...");
    const timestamp = await Oracle.notarize(() => Date.now());

    if (!timestamp) {
      console.error("Oracle.notarize() devolvió un valor vacío");
      return res.status(500).json({ error: "Oracle.notarize() no devolvió un valor válido" });
    }

    console.log("Timestamp notarizado por Oracle:", timestamp);
    return res.status(200).json({ timestamp });
  } catch (error) {
    console.error("Error obteniendo timestamp de Oracle:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
