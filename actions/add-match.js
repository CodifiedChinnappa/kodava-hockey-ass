"use server";

import { getUserById } from "@/data/user"; // Importing a function to get user by ID
import { db } from "@/lib/db"; // Importing database connection from the lib directory
import { MatchesSchema } from "@/schemas";
import { Pool, Round, Venues } from "@prisma/client";

export const addMatch = async (values) => {
  const validatedFields = MatchesSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const {
    data: { venue, pool, round, team1, team2, scheduledOn, createdBy },
  } = validatedFields;
  // Check if the user exists
  const existingUser = await getUserById(createdBy);
  const nextMatchNo = (await db.matches.count()) + 1;

  // If user does not exist, return an error
  if (!existingUser) {
    return { error: "User does not exist!" };
  }

  // Check if the user is an admin
  if (!existingUser.role == "ADMIN") {
    return { error: "User is not an admin!" };
  }

  const enumHelper = function (enums, value) {
    for (const item of Object.values(enums)) {
      // Check if the current enum value matches the provided value
      if (item === value.toUpperCase()) {
        // Assuming enums are all uppercased
        return item; // Return the matching enum value
      }
    }
    return null; // If no match found
  };
  // Create the tournament in the database
  const createdTeam1 = await db.teams.create({
    data: {
      families: {
        connect: {
          id: team1,
        },
      },
    },
  });
  const createdTeam2 = await db.teams.create({
    data: {
      families: {
        connect: {
          id: team2,
        },
      },
    },
  });

  // Create the tournament in the database
  const createdMatch = await db.matches.create({
    data: {
      matchNo: nextMatchNo,
      venue: enumHelper(Venues, venue),
      pool: enumHelper(Pool, pool),
      round: enumHelper(Round, round),
      scheduledOn,
      participants: {
        connect: [{ id: createdTeam1.id }, { id: createdTeam2.id }],
      },
      tournament: { connect: { id: process.env.TOURNAMENT_ID } },
      createdBy: { connect: { id: values.createdBy } },
    },
  });

  // Return success message and created tournament data
  return { success: "Match added!", data: createdMatch };
};
