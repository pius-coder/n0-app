export const NumberStatus = {
  AVAILABLE: "available",
  RESERVED: "reserved",
  SOLD: "sold",
  SUSPENDED: "suspended",
} as const;

export type NumberStatus = (typeof NumberStatus)[keyof typeof NumberStatus];

export const NUMBER_STATUS_CONFIG: Record<
  NumberStatus,
  { label: string; color: string; dotColor: string }
> = {
  available: { label: "Disponible", color: "text-green-600", dotColor: "bg-green-500" },
  reserved: { label: "Réservé", color: "text-yellow-600", dotColor: "bg-yellow-500" },
  sold: { label: "Vendu", color: "text-red-600", dotColor: "bg-red-500" },
  suspended: { label: "Suspendu", color: "text-gray-600", dotColor: "bg-gray-500" },
};
