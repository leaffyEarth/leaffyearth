import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      picture?: string;
      role?: string;
    } & DefaultSession["user"];
    accessToken?: string;
  }
  interface User extends DefaultUser {
    id: string;
    role?: string;
  }
}
