import type { NextRequest } from "next/server";
import { UserHomeService } from "@/server/services";
import { success, error } from "@/server/helpers";
import { createModuleLogger } from "@/packages/logger";

const logger = createModuleLogger("api-user-home");

export async function GET(_req: NextRequest) {
  try {
    // TODO: replace "demo-user" with real auth: const user = await requireAuth();
    const result = await UserHomeService.getPageData("demo-user");

    if (!result.ok) return error(result.error);

    return success(result.data);
  } catch (e) {
    return error(e);
  }
}
