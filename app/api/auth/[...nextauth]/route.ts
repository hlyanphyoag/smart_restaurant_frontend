import { api } from "@/services/api";
import NextAuth, { DefaultSession, DefaultUser, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {

  interface Session {
    accessToken?: string;
    token: string;

  }

  interface User extends DefaultUser {
    accessToken?: string;
  }
}

export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        const res = await api.post("/api/auth/login", {
            email: credentials?.email,
            password: credentials?.password,
        });

        const data = await res.data;
        
        if (data.token && data.user) {
          return {
            ...data.user,
            accessToken: data.token,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = token.user as User;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
