import { AppError } from "./base.error";

export class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super("NOT_FOUND", 404, `${resource} "${id}" introuvable`);
  }
}
