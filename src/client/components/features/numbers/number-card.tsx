import type { PhoneNumber } from "@/shared/types";
import { formatPrice } from "@/shared/utils";
import { Card, CardContent, CardFooter, Button } from "@/client/components/ui";
import { StatusBadge } from "@/client/components/common";

type NumberCardProps = {
  number: PhoneNumber;
  onPurchase?: (id: string) => void;
};

export function NumberCard({ number, onPurchase }: NumberCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <p className="text-xl font-mono font-bold">{number.value}</p>
          <StatusBadge status={number.status} />
        </div>
        <p className="mt-2 text-2xl font-bold text-blue-600">
          {formatPrice(number.price)}
        </p>
        <p className="mt-1 text-xs text-neutral-500 capitalize">
          {number.category}
        </p>
      </CardContent>
      {number.status === "available" && onPurchase && (
        <CardFooter>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => onPurchase(number.id)}
          >
            Acheter
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
