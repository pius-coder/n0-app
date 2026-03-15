import { AppError } from "./base.error";

export class UnauthorizedError extends AppError {
  constructor(message = "Non autorisé") {
    super("UNAUTHORIZED", 401, message);
  }
}
