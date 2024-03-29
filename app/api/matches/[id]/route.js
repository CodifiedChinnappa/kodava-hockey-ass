import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request) {
  const { pathname } = request.nextUrl;
  const id = pathname.split("/matches/")[1]; // Extract the value after '/matches/'
  try {
    const matches = await db.matches.findMany({
      where: {
        id,
      },
      include: {
        participants: {
          include: {
            families: { include: { players: true } },
            goals:{ include: { players: true } },
          },
        },
      },
    });
    return NextResponse.json({ ...matches });
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
