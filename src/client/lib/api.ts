import { createClient } from "@/packages/api-client";
import type { PhoneNumber, ApiResponse } from "@/shared/types";
import type { SearchNumberInput } from "@/shared/schemas";

const client = createClient({
  baseUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
});

export const api = {
  numbers: {
    search: (params?: Partial<SearchNumberInput>) =>
      client.get<ApiResponse<PhoneNumber[]>>("/api/numbers", params as Record<string, string>),

    getById: (id: string) =>
      client.get<ApiResponse<PhoneNumber>>(`/api/numbers/${id}`),
  },
};
