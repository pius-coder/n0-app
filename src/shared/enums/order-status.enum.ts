export const OrderStatus = {
  PENDING: "pending",
  PAID: "paid",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
