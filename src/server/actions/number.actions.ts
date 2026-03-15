"use server";

import { NumberService } from "@/server/services";
import { createNumberSchema } from "@/shared/schemas";

export async function searchNumbers(query?: string) {
  const result = await NumberService.search({
    query,
    page: 1,
    pageSize: 20,
  });

  if (!result.ok) {
    return { error: result.error.message };
  }

  return { data: result.data };
}

export async function createNumber(formData: FormData) {
  const raw = {
    value: formData.get("value"),
    price: Number(formData.get("price")),
    category: formData.get("category"),
  };

  const parsed = createNumberSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const result = await NumberService.create(parsed.data);

  if (!result.ok) {
    return { error: result.error.message };
  }

  return { data: result.data };
}
