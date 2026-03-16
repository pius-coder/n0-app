import { z } from "zod";

export const phoneSchema = z
  .string()
  .min(8, "Numéro invalide")
  .regex(/^\+?[1-9]\d{1,14}$/, "Format international requis");

export const loginSchema = z.object({
  phone: phoneSchema,
  password: z.string().min(1, "Mot de passe requis"),
});

// Server-side registration schema (no confirmPassword)
export const registerServerSchema = z.object({
  phone: phoneSchema,
  password: z.string().min(6, "6 caractères minimum"),
  name: z.string().min(2, "Nom trop court").optional(),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
});

// Client-side registration schema (with confirmPassword)
export const registerClientSchema = registerServerSchema.extend({
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterServerInput = z.infer<typeof registerServerSchema>;
export type RegisterClientInput = z.infer<typeof registerClientSchema>;
