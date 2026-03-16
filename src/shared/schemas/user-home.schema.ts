import { z } from "zod";

// ─── Atomic ───────────────────────────────────────────────────────────────────

const serviceIconKeySchema = z.enum([
  "whatsapp",
  "facebook",
  "vk",
  "telegram",
  "instagram",
]);

const serviceStatusSchema = z.enum(["active", "inactive", "pending"]);

const serverStatusSchema = z.enum(["online", "offline", "maintenance"]);

// ─── Server ───────────────────────────────────────────────────────────────────

export const userServerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  serverId: z.string().min(1),
  status: serverStatusSchema,
  avatarUrl: z.string().url().optional(),
});

// ─── Balance ──────────────────────────────────────────────────────────────────

export const userBalanceSchema = z.object({
  amount: z.number().nonnegative(),
  currency: z.string().length(3),
  changePercent: z.number(),
  changeDirection: z.enum(["up", "down"]),
  sparklineData: z.array(z.number()).min(2),
  updatedAt: z.coerce.date(),
});

// ─── Service ──────────────────────────────────────────────────────────────────

export const userServiceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  subtitle: z.string(),
  status: serviceStatusSchema,
  iconKey: serviceIconKeySchema,
  numbersCount: z.number().int().nonnegative(),
});

// ─── Page aggregate ───────────────────────────────────────────────────────────

export const userHomeDataSchema = z.object({
  server: userServerSchema,
  balance: userBalanceSchema,
  services: z.array(userServiceSchema),
});

// ─── Inferred types ───────────────────────────────────────────────────────────

export type UserHomeDataInput = z.infer<typeof userHomeDataSchema>;
