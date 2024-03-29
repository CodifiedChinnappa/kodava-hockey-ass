import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const today = new Date();
    const todayString = today.toISOString().slice(0, 10); // Get today's date in "YYYY-MM-DD" format

    const todayMatches = await getMatchesForToday(todayString);
    return NextResponse.json({ matches: todayMatches });
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function getMatchesForToday(today) {
  // Implement logic to fetch matches scheduled for today from the database
  const matches = await db.matches.findMany({
    where: {
      scheduledOn: {
        startsWith: today, // Filter matches with scheduledOn field starting with today's date
      },
    },
    include: {
      participants: true,
    },
  });
  return matches;
}
