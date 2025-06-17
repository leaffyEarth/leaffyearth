export interface User {
    _id: string;
    uid: string;
    email: string;
    name: string;
    role: "owner" | "manager" | "admin" | "user";
    dob: string;
    gender: "male" | "female" | "other";
    createdAt?: string;
    updatedAt?: string;
}