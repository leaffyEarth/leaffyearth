export interface User {
  _id: string;
  email: string;
  role: "owner" | "manager" | "admin";
  displayName?: string;
  createdAt?: string;
  updatedAt?: string;
}
