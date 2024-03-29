"use server";

import { db } from "@/lib/db"; // Importing database connection from the lib directory

export const deletePenalty = async (values) => {
  const { teamId, index } = values;

  try {
    // Fetch the existing team data to get the current penaltyShoot array
    const existingTeam = await db.teams.findUnique({
      where: { id: teamId },
      select: { penaltyShoot: true },
    });

    if (!existingTeam) {
      return { error: "Team not found!" };
    }

    // Remove the item at the specified index from the penaltyShoot array
    const updatedPenaltyShoot = existingTeam.penaltyShoot.filter(
      (_, i) => i !== index
    );

    // Update the team data to set the new penaltyShoot array
    const updated = await db.teams.update({
      where: { id: teamId },
      data: {
        penaltyShoot: updatedPenaltyShoot,
      },
    });

    return { success: "Penalty deleted!", data: updated };
  } catch (error) {
    console.error("Error", error);
    return { error: "Something went wrong!" };
  }
};
