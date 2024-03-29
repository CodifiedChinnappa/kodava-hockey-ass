import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request) {
  const { pathname } = request.nextUrl;
  const id = pathname.split("/families/")[1];
    try {
    const family = await db.families.findMany({
      where: {
        id: id,
      },
      include: {
        players: true, // Include players related to this family
      },
    });
    return NextResponse.json(family);
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
