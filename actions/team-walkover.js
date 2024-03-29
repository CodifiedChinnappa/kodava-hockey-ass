"use server";

import { db } from "@/lib/db"; // Importing database connection from the lib directory
export const updateWalkover = async (values) => {
  const { matchId, teamId } = values;
  try {
    // Get the match data to identify the opposing team
    const match = await db.matches.findUnique({
      where: { id: matchId },
      include: {
        participants: {
          include: {
            families: { include: { players: true } },
            goals: { include: { players: true } },
          },
        },
      },
    });

    // Find the opposing team's ID
    const opposingTeam = match.participants.find(
      (participant) => participant.id !== teamId
    );

    // Update the walked over team record to mark the walkover
    const walkedOverTeam = await db.teams.update({
      where: { id: teamId },
      data: {
        walkover: true,
        eliminated: true
      },
    });

    // Update the match data to set the winner as the opposing team
    const updatedMatch = await db.matches.update({
      where: { id: matchId },
      data: {
        winner: opposingTeam.families.familyName,
        status: "PLAYED",
      },
    });

    // Return success message and updated match data
    return { success: "Walkover recorded!", data: updatedMatch };
  } catch (error) {
    console.error("Error", error);
    return { error: "Something went wrong!" };
  }
};
