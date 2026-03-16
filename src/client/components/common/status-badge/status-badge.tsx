import { Badge } from "@/client/components/ui";
import { NUMBER_STATUS_CONFIG } from "@/shared/enums";
import type { NumberStatus } from "@/shared/enums";

type StatusBadgeProps = {
  status: NumberStatus;
};

const VARIANT_MAP: Record<NumberStatus, "success" | "warning" | "error" | "default"> = {
  available: "success",
  reserved: "warning",
  sold: "error",
  suspended: "default",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = NUMBER_STATUS_CONFIG[status];
  return <Badge variant={VARIANT_MAP[status]}>{config.label}</Badge>;
}
