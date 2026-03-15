import { AppError } from "./base.error";

export class ForbiddenError extends AppError {
  constructor(message = "Accès interdit") {
    super("FORBIDDEN", 403, message);
  }
}
