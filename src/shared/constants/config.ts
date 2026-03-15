export const APP_CONFIG = {
  name: "_n0",
  description: "Your number, zero hassle.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  currency: "EUR",
  locale: "fr-FR",
} as const;

export const PAGINATION = {
  defaultPage: 1,
  defaultPageSize: 20,
  maxPageSize: 100,
} as const;

export const NUMBER_CATEGORIES = {
  gold: { label: "Gold", multiplier: 10, color: "#FFD700" },
  silver: { label: "Silver", multiplier: 5, color: "#C0C0C0" },
  bronze: { label: "Bronze", multiplier: 2, color: "#CD7F32" },
  standard: { label: "Standard", multiplier: 1, color: "#6B7280" },
} as const;
