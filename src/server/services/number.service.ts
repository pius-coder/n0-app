import { Ok, Err, type Result } from "@/packages/result";
import type { PhoneNumber } from "@/shared/types";
import type { CreateNumberInput, SearchNumberInput } from "@/shared/schemas";

// TODO: Remplacer par de vraies queries DB quand la DB sera setup
const MOCK_NUMBERS: PhoneNumber[] = [
  {
    id: "1",
    value: "+33612345678",
    price: 99,
    status: "available",
    category: "gold",
    ownerId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    value: "+33698765432",
    price: 49,
    status: "available",
    category: "silver",
    ownerId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const NumberService = {
  async search(filters: SearchNumberInput): Promise<Result<PhoneNumber[]>> {
    try {
      let results = [...MOCK_NUMBERS];

      if (filters.query) {
        results = results.filter((n) => n.value.includes(filters.query!));
      }
      if (filters.category) {
        results = results.filter((n) => n.category === filters.category);
      }

      return Ok(results);
    } catch (e) {
      return Err(e as Error);
    }
  },

  async getById(id: string): Promise<Result<PhoneNumber>> {
    const number = MOCK_NUMBERS.find((n) => n.id === id);
    if (!number) return Err(new Error("Not found"));
    return Ok(number);
  },

  async create(input: CreateNumberInput): Promise<Result<PhoneNumber>> {
    const number: PhoneNumber = {
      id: crypto.randomUUID(),
      ...input,
      status: "available",
      ownerId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return Ok(number);
  },
};
