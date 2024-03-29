"use server";

import { getUserById } from "@/data/user"; // Importing a function to get user by ID
import { db } from "@/lib/db"; // Importing database connection from the lib directory

export const addPlayer = async (values) => {
  const { families, playerName, createdBy } = values;
  try {
    // Check if a player already exists in the provided family
    const existingPlayer = await db.players.findFirst({
      where: {
        playerName: playerName,
      },
    });

    // If a player already exists in the family, return an error
    if (existingPlayer) {
      return {
        error: "A player already exists in this family! try different name",
      };
    }
    // Check if the user exists
    const existingUser = await getUserById(createdBy);

    // If user does not exist, return an error
    if (!existingUser) {
      return { error: "User does not exist!" };
    }

    // Check if the user is an admin
    // if (existingUser.role !== "USER" || "ADMIN") {
    //   return { error: "User not authorized!" };
    // }

    // Create the family in the database
    const createdPlayer = await db.players.create({
      data: {
        playerName: playerName,
        familyIds: [families],
      },
    });

    // Update the family to include the newly created player
    const updatedFamily = await db.families.update({
      where: { id: families },
      data: {
        playersId: {
          push: [createdPlayer.id],
        },
      },
    });

    // Return success message and created family data
    return { success: "Player added!", data: { updatedFamily, createdPlayer } };
  } catch (error) {
    console.error("Error adding player:", error);
    return { error: "Something went wrong!" };
  }
};
