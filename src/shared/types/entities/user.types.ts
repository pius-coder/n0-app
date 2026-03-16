import { UserRole } from "../../enums/user.enum";

export type User = {
  id: string;
  email: string;
  phone: string | null;
  role: UserRole;
  balanceFcfa: number;
  isActive: boolean;
  name: string | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserPreview = Pick<User, "id" | "email" | "name" | "role" | "balanceFcfa">;
export type SessionUser = Pick<User, "id" | "email" | "role" | "isActive">;
