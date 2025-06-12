export type UserRole = "student" | "admin" | "teacher" | "parent";

export interface User {
  id: string;
  name?: string;
  role: UserRole;
  token: string;
  email?: string;
}
