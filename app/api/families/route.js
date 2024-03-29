import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const families = await db.families.findMany();
    return NextResponse.json(families);
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
