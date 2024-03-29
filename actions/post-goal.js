"use server";

import { db } from "@/lib/db"; // Importing database connection from the lib directory

export const postGoal = async (values) => {
  const { playerId, minute, teamId ,type} = values;

  try {
    // Create the family in the database
    const goal = await db.goals.create({
      data: {
        playersId: [playerId],
        minute: parseInt(minute),
        type
      },
    });

    // Update the family to include the newly created player
    const updatedTeam = await db.teams.update({
      where: { id: teamId },
      data: {
        goalsId: {
          push: [goal.id],
        },
      },
    });

    // Return success message and created family data
    return { success: "Player added!", data: goal };
  } catch (error) {
    console.error("Error", error);
    return { error: "Something went wrong!" };
  }
};
