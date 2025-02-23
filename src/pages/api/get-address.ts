import type { NextApiRequest, NextApiResponse } from "next";
import { getAddress } from "@chopinframework/next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") return res.status(405).json({ error: "Método no permitido" });

    const address = await getAddress();
    return res.status(200).json({ address });
  } catch (error) {
    console.error("Error obteniendo dirección:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
