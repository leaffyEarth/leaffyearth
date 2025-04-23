import { DefaultSession, DefaultUser } from "next-auth";

export interface ISession extends DefaultSession {
  user?: IUser;
  expires: string;
}

export interface IUser extends DefaultUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: string;
} 