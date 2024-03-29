"use server";

import { db } from "@/lib/db"; // Importing database connection from the lib directory
import { calculateWinner } from "@/lib/utils";
export const endGame = async (values) => {
  const { matchId } = values;
  try {
    // Get the match data to identify the opposing team
    const match = await db.matches.findUnique({
      where: { id: matchId },
      include: {
        participants: {
          include: {
            families: true,
            goals: true,
          },
        },
      },
    });

    const { winner, loser } = calculateWinner(match.participants);

    // // Update the walked over team record to mark the walkover
    const updateLostTeam = await db.teams.update({
      where: { id: loser.id },
      data: {
        eliminated: true,
      },
    });

    // Update the match data to set the winner as the opposing team
    const updatedMatch = await db.matches.update({
      where: { id: matchId },
      data: {
        winner: winner.families.familyName,
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
