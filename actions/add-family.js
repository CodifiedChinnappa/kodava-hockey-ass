"use server";

import { getUserById } from "@/data/user"; // Importing a function to get user by ID
import { db } from "@/lib/db"; // Importing database connection from the lib directory
import { AddFamilySchema } from "@/schemas";

export const addFamily = async (values) => {
  const validatedFields = AddFamilySchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    data: { createdBy, familyName },
  } = validatedFields;

  try {
    // Check if the family name already exists in the database
    const existingFamily = await db.families.findUnique({
      where: {
        familyName: familyName,
      },
    });

    // If the family name already exists, return an error
    if (existingFamily) {
      return { error: "Family name already exists!" };
    }

    // Check if the user exists
    const existingUser = await getUserById(createdBy);

    // If user does not exist, return an error
    if (!existingUser) {
      return { error: "User does not exist!" };
    }

    // Check if the user is an admin
    if (existingUser.role !== "ADMIN") {
      return { error: "User is not an admin!" };
    }

    // Create the family in the database
    const createdFamily = await db.families.create({
      data: {
        familyName: familyName,
        createdBy: { connect: { id: createdBy } },
      },
    });

    // Return success message and created family data
    return { success: "Family added!", data: createdFamily };
  } catch (error) {
    // console.error("Error adding family:", error);
    return { error: "Something went wrong!" };
  }
};
