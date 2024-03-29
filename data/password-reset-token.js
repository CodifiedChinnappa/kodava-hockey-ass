import { db } from "@/lib/db";

export const getPasswordResetTokenByToken = async (token) => {
  try {
    const {passwordResetToken} = await db.user.findFirst({
      where: { passwordResetToken:  token  },
      include: { passwordResetToken: true } // Include the passwordResetToken field
    });
    if (!passwordResetToken) {
      // Handle case where user with the token is not found
      return null;
    }

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email) => {
  try {
    const { passwordResetToken } = await db.user.findUnique({
      where: { email },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};
