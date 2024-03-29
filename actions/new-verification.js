"use server";

import { db } from "@/lib/db";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  await db.user.update({
    where: { email: existingToken.email },
    data: {
      emailVerified: true,
      verificationToken: null,
    },
  });

  return { success: "Email verified!" };
};
