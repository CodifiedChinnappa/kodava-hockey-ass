"use server";

import { getUserById } from "@/data/user"; // Importing a function to get user by ID
import { db } from "@/lib/db"; // Importing database connection from the lib directory

export const addTournament = async (values) => {
  // Extract validated data
  const { year, familiesId, createdBy } = values;

  if (!familiesId) {
    return { error: "Please select a family!" };
  }

  // Check if the user exists
  const existingUser = await getUserById(createdBy);

  // If user does not exist, return an error
  if (!existingUser) {
    return { error: "User does not exist!" };
  }

  // Check if the user is an A  
  if (!existingUser.role == "ADMIN") {
    return { error: "User is not an admin!" };
  }

  
  // Check if a tournament already exists for the same family and year
  const existingTournament = await db.tournaments.findFirst({
    where: {
      year,
      // familyId: "6602c0e1a7aa3daf6fecfa00", // Assuming this is the family ID you're checking against
    },
  });

  // If tournament exists, return an error
  if (existingTournament) {
    return { error: "A tournament for this year has already exists!" };
  }

  // Create the tournament in the database
  const createdTournament = await db.tournaments.create({
    data: {
      year,
      family: { connect: { id: "6602c0e1a7aa3daf6fecfa00" } },
      createdBy: { connect: { id: createdBy } },
    },
  });

  // Return success message and created tournament data
  return { success: "Tournament added!", data: createdTournament };
};
