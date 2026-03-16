import { Ok, Err, type Result } from "@/packages/result";
import { UserHomeQueries } from "@/server/db/queries/user-home.queries";
import { NotFoundError } from "@/server/errors";
import type { UserHomeData } from "@/shared/types";

export const UserHomeService = {
  /**
   * Load all data required to render the user home page.
   */
  async getPageData(userId: string): Promise<Result<UserHomeData>> {
    try {
      const data = await UserHomeQueries.findPageDataByUser(userId);

      if (!data) {
        return Err(new NotFoundError("UserHomeData", userId));
      }

      return Ok(data);
    } catch (e) {
      return Err(e as Error);
    }
  },
};
