"use server";

import { revalidatePath } from "next/cache";
import { UserHomeService } from "@/server/services";
import { ROUTES } from "@/shared/constants/routes";

/**
 * Trigger a balance refresh for the current user.
 * Called when user taps "Recharge" and completes a top-up.
 */
export async function refreshUserBalance(_userId: string) {
  // const result = await BalanceService.refresh(userId);
  // if (!result.ok) return { error: result.error.message };

  revalidatePath(ROUTES.HOME);
  return { data: null };
}

/**
 * Load user page data — used as a fallback server action
 * when you need to re-fetch after a mutation.
 */
export async function loadUserHomeData(userId: string) {
  const result = await UserHomeService.getPageData(userId);

  if (!result.ok) {
    return { error: result.error.message };
  }

  return { data: result.data };
}
