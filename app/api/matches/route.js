import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {

  try {
    const matches = await db.matches.findMany({
      include: {
        participants: {
          include: {
            families: { include: { players: true } },
            goals: { include: { players: true } },
          },
        },
      },
    });
    return NextResponse.json({matches});
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
