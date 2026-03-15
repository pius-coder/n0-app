import type { NumberStatus } from "@/shared/enums";

export type NumberCategory = "gold" | "silver" | "bronze" | "standard";

export type PhoneNumber = {
  id: string;
  value: string;
  price: number;
  status: NumberStatus;
  category: NumberCategory;
  ownerId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type NumberPreview = Pick<PhoneNumber, "id" | "value" | "price" | "category">;
export type NumberCreateInput = Pick<PhoneNumber, "value" | "price" | "category">;
export type NumberUpdateInput = Partial<NumberCreateInput>;
