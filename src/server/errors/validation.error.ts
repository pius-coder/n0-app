import { AppError } from "./base.error";
import type { ZodError } from "zod";

export class ValidationError extends AppError {
  constructor(zodError: ZodError) {
    const details: Record<string, string[]> = {};

    zodError.errors.forEach((err) => {
      const path = err.path.join(".");
      (details[path] ??= []).push(err.message);
    });

    super("VALIDATION_ERROR", 400, "Données invalides", details);
  }
}
