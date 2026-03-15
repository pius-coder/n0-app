import { create } from "zustand";
import type { NumberPreview } from "@/shared/types";

type CartState = {
  items: NumberPreview[];
  add: (item: NumberPreview) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  add: (item) =>
    set((state) => {
      if (state.items.some((i) => i.id === item.id)) return state;
      return { items: [...state.items, item] };
    }),

  remove: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  clear: () => set({ items: [] }),

  total: () => get().items.reduce((sum, i) => sum + i.price, 0),
}));
