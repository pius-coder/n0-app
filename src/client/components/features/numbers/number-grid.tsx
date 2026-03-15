"use client";

import type { PhoneNumber } from "@/shared/types";
import { NumberCard } from "./number-card";
import { EmptyState } from "@/client/components/common";

type NumberGridProps = {
  numbers: PhoneNumber[];
  onPurchase?: (id: string) => void;
};

export function NumberGrid({ numbers, onPurchase }: NumberGridProps) {
  if (numbers.length === 0) {
    return (
      <EmptyState
        title="Aucun numéro trouvé"
        description="Essayez de modifier vos filtres de recherche."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {numbers.map((number) => (
        <NumberCard key={number.id} number={number} onPurchase={onPurchase} />
      ))}
    </div>
  );
}
