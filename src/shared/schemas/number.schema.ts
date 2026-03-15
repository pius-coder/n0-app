import { z } from "zod";

export const phoneValueSchema = z
  .string()
  .min(7, "Minimum 7 chiffres")
  .max(15, "Maximum 15 chiffres")
  .regex(/^\+?[1-9]\d{6,14}$/, "Format de numéro invalide");

export const priceSchema = z
  .number()
  .min(1, "Prix minimum 1€")
  .max(100_000, "Prix maximum 100 000€");

export const categorySchema = z.enum(["gold", "silver", "bronze", "standard"]);

export const createNumberSchema = z.object({
  value: phoneValueSchema,
  price: priceSchema,
  category: categorySchema,
});

export const updateNumberSchema = createNumberSchema.partial();

export const searchNumberSchema = z.object({
  query: z.string().optional(),
  category: categorySchema.optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateNumberInput = z.infer<typeof createNumberSchema>;
export type UpdateNumberInput = z.infer<typeof updateNumberSchema>;
export type SearchNumberInput = z.infer<typeof searchNumberSchema>;
