import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

export const generatePasswordResetToken = async (email) => {
  const token = uuidv4();

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    // Delete the existing token from the user
    await db.user.update({
      where: { id: email }, // Assuming existingToken contains the userId
      data: { passwordResetToken: null }, // Setting passwordResetToken field to null to delete it
    });
  }

  const { passwordResetToken } = await db.user.update({
    where: { email },
    data: { passwordResetToken: token },
  });

  return passwordResetToken;
};

export const generateVerificationToken = async (email) => {
  const token = uuidv4();
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.user.update({
      where: { email },
      data: { verificationToken: null },
    });
  }

  const { verificationToken } = await db.user.update({
    where: { email },
    data: { verificationToken: token },
  });

  return verificationToken;
};
