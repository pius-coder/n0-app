import type { OrderStatus } from "@/shared/enums";

export type Order = {
  id: string;
  userId: string;
  numberId: string;
  amount: number;
  status: OrderStatus;
  stripeSessionId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderCreateInput = Pick<Order, "userId" | "numberId" | "amount">;
