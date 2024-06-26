import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

const config = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            // Return user object as session

            return user;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt(params) {
      if (params.user?.role) {
        params.token.role = params.user.role;
      }
      if (params.user?.email) {
        params.token.email = params.user.email;
      }
      return params.token;
    },
    async session({ session, token }) {
      session.role = token.role;
      session.email = token.email;
      session.id = token.sub;
      return session;
    },
  },
 
};

export default config;
