import { Badge } from "@/client/components/ui";
import { cn } from "@/client/lib/cn";

/**
 * Reseller tiers section showing market position
 */
export function ResellerTiers() {
    return (
        <section className="py-20 sm:py-32 bg-neutral-50/50">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <Badge variant="blue" className="bg-violet-100 text-violet-600 border-violet-200 px-4 py-1 font-semibold">
                        For Resellers
                    </Badge>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                        Exclusive access to direct providers
                    </h2>
                    <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
                        Stop paying inflated prices to middlemen. We connect you directly to the source for minimum latency and maximum profit.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 lg:grid-cols-3">
                    <PricingCard
                        title="Retail sellers"
                        markup="+3000%"
                        description="Typical pricing on public marketplaces."
                        features={["Highest cost per SMS", "Unknown reliability", "Slower delivery"]}
                        variant="muted"
                    />
                    <PricingCard
                        title="Resale providers"
                        markup="+500%"
                        description="Small panels reselling from larger hubs."
                        features={["Moderate markups", "Limited API scale", "Variable latency"]}
                        variant="muted"
                    />
                    <PricingCard
                        title="Direct providers"
                        markup="0%"
                        description="Our platform connects you to the source."
                        features={["Lowest possible cost", "Unlimited API throughput", "Direct infrastructure"]}
                        highlight
                    />
                </div>
            </div>
        </section>
    );
}

function PricingCard({ title, markup, description, features, variant, highlight }: {
    title: string;
    markup: string;
    description: string;
    features: string[];
    variant?: "muted";
    highlight?: boolean;
}) {
    return (
        <div className={cn(
            "relative rounded-3xl p-8 flex flex-col h-full transition-all duration-500 hover:-translate-y-2",
            highlight
                ? "bg-white border-2 border-blue-600 shadow-2xl ring-4 ring-blue-50/50 z-10"
                : "bg-white border border-neutral-200 shadow-sm opacity-80"
        )}>
            {highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-blue-500/40">
                    Recommended
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                    <span className={cn("text-4xl font-black tracking-tight", highlight ? "text-blue-600" : "text-neutral-400")}>
                        {markup}
                    </span>
                    <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Markup</span>
                </div>
                <p className="mt-4 text-sm text-neutral-500 leading-relaxed">{description}</p>
            </div>

            <div className="flex-1 space-y-4 pt-6 border-t border-neutral-100">
                {features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className={cn("h-1.5 w-1.5 rounded-full", highlight ? "bg-blue-600" : "bg-neutral-300")} />
                        <span className="text-sm text-neutral-600">{f}</span>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <button className={cn(
                    "w-full py-4 rounded-xl font-bold transition-all duration-300 transform active:scale-[0.98]",
                    highlight
                        ? "bg-neutral-900 text-white hover:bg-neutral-800 shadow-xl shadow-neutral-900/20"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                )}>
                    {highlight ? "YOU ARE HERE" : "Choose Tier"}
                </button>
            </div>
        </div>
    );
}
