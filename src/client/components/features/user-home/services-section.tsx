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
      <div className="mb-2 flex items-center justify-between px-1">
        <h2 className="font-sans text-[13px] font-medium text-brand-text/40 tracking-tight">
          Services
        </h2>
        <button className="text-[12px] font-medium text-brand-muted/70 transition-colors hover:text-brand-text">
          Voir tout
        </button>
      </div>

      {/* Services list card */}
      <div className="overflow-hidden rounded-3xl bg-brand-surface shadow-card">
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
