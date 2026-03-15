import { APP_CONFIG } from "@/shared/constants";

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat(APP_CONFIG.locale, {
    style: "currency",
    currency: APP_CONFIG.currency,
  }).format(amount);
}
