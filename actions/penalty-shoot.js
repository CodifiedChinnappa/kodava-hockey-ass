"use server";

import { db } from "@/lib/db"; // Importing database connection from the lib directory

export const penaltyShoot = async (values) => {
  const { teamId, result } = values;
  try {
    // Update the team data to set the new goalsId array
    const updated = await db.teams.update({
      where: { id: teamId },
      data: {
        penaltyShoot:{
          push: [result],
        }, 
      },
    });

    // Return success message and created family data
    return { success: "Score added!", data: updated };
  } catch (error) {
    console.error("Error", error);
    return { error: "Something went wrong!" };
  }
};


