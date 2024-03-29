"use server";

import { db } from "@/lib/db"; // Importing database connection from the lib directory

export const updateGameDuration = async (values) => {
  const { matchId, duration } = values;
  try {
    // Update the team data to set the new goalsId array
    const updatedDuration = await db.matches.update({
      where: { id: matchId },
      data: {
        duration,
      },
    });

    // Return success message and created family data
    return { success: "Duration Updated!", data: updatedDuration };
  } catch (error) {
    console.error("Error", error);
    return { error: "Something went wrong!" };
  }
};
