import { NextResponse } from "next/server";
import { getAddress } from "@chopinframework/next";

export async function GET() {
  try {
    const address = await getAddress();
    return NextResponse.json({ address });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching address" }, { status: 500 });
  }
}
