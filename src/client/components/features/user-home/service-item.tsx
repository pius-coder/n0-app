import type { UserService } from "@/shared/types";
import { ServiceStatus } from "@/shared/enums";
import { ServiceIcon } from "./service-icons";

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
        <p className="font-display text-[15px] font-bold tracking-tight text-brand-text">
          {service.name}
        </p>
        <p className="mt-0.5 text-xs text-brand-hint">
          {service.subtitle}
        </p>
      </div>

      {/* Status + chevron */}
      <div className="flex shrink-0 flex-col items-end gap-1">
        <div
          className={[
            "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold",
            isActive
              ? "bg-brand-green-bg text-brand-green-text"
              : "bg-gray-100 text-gray-500",
          ].join(" ")}
        >
          {isActive && (
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-brand-green" />
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
