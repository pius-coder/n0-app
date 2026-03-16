import type { UserService } from "@/shared/types";
import { ServiceItem } from "./service-item";

type ServicesSectionProps = {
  services: UserService[];
  onServicePress?: (id: string) => void;
};

export function ServicesSection({ services, onServicePress }: ServicesSectionProps) {
  return (
    <section>
      {/* Section header */}
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className="font-display text-[11px] font-semibold uppercase tracking-widest text-brand-hint">
          Services
        </h2>
        <button className="border-b border-brand-border pb-px text-[12.5px] font-medium text-brand-muted transition-colors hover:text-brand-text">
          Voir tout
        </button>
      </div>

      {/* Services list card */}
      <div className="overflow-hidden rounded-4xl bg-brand-surface shadow-card">
        {services.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 px-4 py-12 text-center">
            <p className="text-sm font-medium text-brand-muted">
              Aucun service actif
            </p>
            <p className="text-xs text-brand-hint">
              Ajoutez un service pour commencer.
            </p>
          </div>
        ) : (
          services.map((service, i) => (
            <ServiceItem
              key={service.id}
              service={service}
              onPress={onServicePress}
              isLast={i === services.length - 1}
            />
          ))
        )}
      </div>
    </section>
  );
}
