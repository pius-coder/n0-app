import type { UserService } from "@/shared/types";
import { ServiceIcon } from "./service-icons";
import { cn } from "@/client/lib/utils";

type ServiceItemProps = {
    service: UserService;
    onPress?: (id: string) => void;
    isLast?: boolean;
};

export function ServiceItem({
    service,
    onPress,
    isLast = false,
}: ServiceItemProps) {
    return (
        <button
            onClick={() => onPress?.(service.id)}
            className={cn(
                "flex w-full items-center gap-4 px-4 py-4 text-left transition-colors active:bg-brand-surface2",
                !isLast && "border-b border-brand-border",
            )}
        >
            {/* Icon - matches skeleton: h-12 w-12 rounded-2xl */}
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl">
                <ServiceIcon iconKey={service.iconKey} size={48} />
            </div>

            {/* Text - matches skeleton: flex-1 space-y-2 */}
            <div className="flex-1 space-y-2">
                <p className="text-[15px] font-bold text-brand-text leading-none">
                    {service.name}
                </p>
                <p className="text-[12px] text-brand-muted leading-none">
                    {service.subtitle}
                </p>
            </div>

            {/* Numbers count badge - matches skeleton: h-6 w-12 rounded-full */}
            <div className="flex h-6 min-w-12 items-center justify-center rounded-full bg-brand-surface px-2.5">
                <span className="text-[11px] font-bold text-brand-text/60">
                    {service.numbersCount}
                </span>
            </div>
        </button>
    );
}
