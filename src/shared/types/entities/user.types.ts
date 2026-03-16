import { UserRole } from "@/shared/enums";

export type User = {
  id: string;
  phone: string;
  email?: string | null;
  name?: string | null;
  avatarUrl?: string | null;
  passwordHash: string;
  role: UserRole;
  credits: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// Minimal payload for JWT security (P0)
export type AuthPayload = {
  sub: string; // userId
  role: UserRole;
};

// SessionUser for hooks/stores (excludes sensitive hash)
export type SessionUser = Pick<User, "id" | "phone" | "role" | "credits" | "name">;
