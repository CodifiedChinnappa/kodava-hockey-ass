import { db } from "@/lib/db";

export const getVerificationTokenByToken = async (token) => {
  try {
    const user = await db.user.findUnique({
      where: {
        verificationToken: token,
      },
    });
    return user;
  } catch (err) {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email) => {
  try {
    const user = await db.user.findFirst({
      where: { email },
    });

    return user.verificationToken;
  } catch {
    return null;
  }
};
