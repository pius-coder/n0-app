import type { NextRequest } from "next/server";
import { NumberService } from "@/server/services";
import { searchNumberSchema } from "@/shared/schemas";
import { ValidationError } from "@/server/errors";
import { success, error } from "@/server/helpers";

export async function GET(req: NextRequest) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams);
    const parsed = searchNumberSchema.safeParse(params);

    if (!parsed.success) {
      return error(new ValidationError(parsed.error));
    }

    const result = await NumberService.search(parsed.data);

    if (!result.ok) return error(result.error);

    return success(result.data);
  } catch (e) {
    return error(e);
  }
}
