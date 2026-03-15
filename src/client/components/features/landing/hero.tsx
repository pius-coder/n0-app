import { APP_CONFIG } from "@/shared/constants";
import { Button } from "@/client/components/ui";

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-6xl font-bold tracking-tight">
        {APP_CONFIG.name}
      </h1>
      <p className="mt-4 max-w-lg text-lg text-neutral-600">
        {APP_CONFIG.description}
      </p>
      <div className="mt-8 flex gap-4">
        <Button variant="primary" size="lg">
          Voir les numéros
        </Button>
        <Button variant="outline" size="lg">
          Comment ça marche
        </Button>
      </div>
    </section>
  );
}
