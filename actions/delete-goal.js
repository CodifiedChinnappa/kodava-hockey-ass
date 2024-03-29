"use server";

import { db } from "@/lib/db"; // Importing database connection from the lib directory

export const deleteGoal = async (values) => {
  const { teamId, goalId } = values;
  try {
    // Create the family in the database
    const goal = await db.goals.delete({
      where: { id: goalId },
    });

    // Fetch the existing team data to get the current goalsId array
    const existingTeam = await db.teams.findUnique({
      where: { id: teamId },
      select: { goalsId: true },
    });

    if (!existingTeam) {
      // Handle case where the team with the given ID is not found
      return; // or throw an error, log a message, etc.
    }

    // Filter out the goal id you want to remove from the array
    const updatedGoalsId = existingTeam.goalsId.filter((id) => id !== goal.id);

    // Update the team data to set the new goalsId array
    const updatedTeam = await db.teams.update({
      where: { id: teamId },
      data: {
        goalsId: updatedGoalsId,
      },
    });

    // Return success message and created family data
    return { success: "Player added!", data: goal };
  } catch (error) {
    console.error("Error", error);
    return { error: "Something went wrong!" };
  }
};
