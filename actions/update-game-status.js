"use server";

import { db } from "@/lib/db"; // Importing database connection from the lib directory

export const updateGameStatus = async (values) => {
  const { matchId, status } = values;
  try {
    // Update the team data to set the new goalsId array
    const updatedStatus = await db.matches.update({
      where: { id: matchId },
      data: {
        status,
      },
    });

    // Return success message and created family data
    return { success: "Status Updated!", data: updatedStatus };
  } catch (error) {
    console.error("Error", error);
    return { error: "Something went wrong!" };
  }
};
