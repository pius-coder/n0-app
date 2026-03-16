import type { ServiceStatus, ServerStatus } from "@/shared/enums";

// ─── Server ───────────────────────────────────────────────────────────────────

export type UserServer = {
  id: string;
  name: string;
  serverId: string;
  status: ServerStatus;
  avatarUrl?: string;
};

// ─── Balance ──────────────────────────────────────────────────────────────────

export type UserBalance = {
  amount: number;
  currency: string;
  changePercent: number;
  changeDirection: "up" | "down";
  sparklineData: number[];
  updatedAt: Date;
};

// ─── Service ──────────────────────────────────────────────────────────────────

export type UserService = {
  id: string;
  name: string;
  subtitle: string;
  status: ServiceStatus;
  iconKey: ServiceIconKey;
  numbersCount: number;
};

export type ServiceIconKey = "whatsapp" | "facebook" | "vk" | "telegram" | "instagram";

// ─── Page aggregate ───────────────────────────────────────────────────────────

export type UserHomeData = {
  server: UserServer;
  balance: UserBalance;
  services: UserService[];
};

// ─── Derived ──────────────────────────────────────────────────────────────────

export type UserServicePreview = Pick<UserService, "id" | "name" | "status" | "iconKey">;

export type NavId = "home" | "recharges" | "numbers" | "profile";
