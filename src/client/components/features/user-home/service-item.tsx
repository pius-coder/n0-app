import type { UserService } from "@/shared/types";
import { ServiceStatus } from "@/shared/enums";
import { ServiceIcon } from "./service-icons";
import { cn } from "@/client/lib/utils";

type ServiceItemProps = {
  service: UserService;
  onPress?: (id: string) => void;
  isLast?: boolean;
};

export function ServiceItem({ service, onPress, isLast = false }: ServiceItemProps) {
  const isActive = service.status === ServiceStatus.ACTIVE;

  return (
    <button
      onClick={() => onPress?.(service.id)}
      className={[
        "flex w-full items-center gap-3.5 px-4 py-4 text-left transition-colors active:bg-brand-surface2",
        !isLast && "border-b border-brand-border",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Icon */}
      <div className="shrink-0 overflow-hidden rounded-2xl shadow-sm">
        <ServiceIcon iconKey={service.iconKey} size={48} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="font-sans text-[15px] font-bold text-brand-text">
          {service.name}
        </p>
        <p className="text-[12px] text-brand-text/40">
          {service.subtitle}
        </p>
      </div>

      {/* Status + badge */}
      <div className="flex shrink-0 items-center gap-2">
        <div
          className={cn(
            "flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-bold",
            isActive
              ? "bg-brand-green-bg text-brand-green"
              : "bg-gray-100/50 text-gray-400"
          )}
        >
          {isActive && (
            <span className="h-1 w-1 rounded-full bg-brand-green shadow-[0_0_4px_rgba(16,185,129,0.5)]" />
          )}
          {isActive ? "Actif" : service.status}
        </div>
      </div>

      {/* Arrow */}
      <svg
        width="7"
        height="12"
        viewBox="0 0 7 12"
        fill="none"
        className="shrink-0 text-brand-hint"
        aria-hidden
      >
        <path
          d="M1 1l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
