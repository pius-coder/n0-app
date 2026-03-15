import { cn } from "@/client/lib/cn";

/**
 * Comparison and small features grid
 */
export function WhyUsComparison() {
    return (
        <section className="py-20 sm:py-32">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                        Why choose _n0?
                    </h2>
                    <p className="mt-4 text-lg text-neutral-600">
                        Engineered for reliability, built for massive scale.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    <FeatureCard title="Huge assortment" desc="Numbers for 10,000+ services including all major apps like WhatsApp, Google and Telegram." />
                    <FeatureCard title="Low prices" desc="We maintain direct connections to providers for best rates, cutting out all middlemen markups." />
                    <FeatureCard title="24/7 Technical Support" desc="Our engineering team is always online to assist with your API integrations and queries." />
                    <FeatureCard title="Affiliate system" desc="Earn up to 10% lifetime commission from every top-up made by your business referrals." />
                    <FeatureCard title="Instant Top-up" desc="Full support for Cryptocurrency, cards and manual payment methods for swift credit updates." />
                    <FeatureCard title="Flexible API" desc="Modern REST API with high limits, detailed delivery logs, and multi-language SDK support." />
                </div>

                {/* Comparison Table */}
                <div className="max-w-4xl mx-auto overflow-hidden rounded-3xl border border-neutral-200 shadow-2xl bg-white transition-all hover:shadow-blue-500/5">
                    <div className="grid grid-cols-2 divide-x divide-neutral-100">
                        <div className="p-8 sm:p-12">
                            <div className="text-blue-600 font-black mb-8 text-xl tracking-tight">Our panel</div>
                            <ul className="space-y-6">
                                <CompareItem text="Lowest market prices" check />
                                <CompareItem text="Unlimited API connections" check />
                                <CompareItem text="Fastest SMS delivery (<5s)" check />
                                <CompareItem text="Direct provider access" check />
                            </ul>
                        </div>
                        <div className="p-8 sm:p-12 bg-neutral-50/50">
                            <div className="text-neutral-400 font-black mb-8 text-xl tracking-tight">Other panels</div>
                            <ul className="space-y-6">
                                <CompareItem text="High retail markups" />
                                <CompareItem text="Limited API endpoints" />
                                <CompareItem text="Slow & failing delivery" />
                                <CompareItem text="Middleman hubs" />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="group p-8 rounded-2xl border border-neutral-100 bg-white shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <div className="h-6 w-6 rounded bg-current opacity-20" />
            </div>
            <h3 className="font-bold text-neutral-900 mb-3 text-lg">{title}</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">{desc}</p>
        </div>
    );
}

function CompareItem({ text, check }: { text: string; check?: boolean }) {
    return (
        <li className="flex items-center gap-4">
            <div className={cn(
                "h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm",
                check ? "bg-green-100 text-green-600" : "bg-red-50 text-red-400"
            )}>
                {check ? "✓" : "✕"}
            </div>
            <span className={cn("text-sm sm:text-base tracking-tight", check ? "text-neutral-900 font-semibold" : "text-neutral-500 font-medium")}>
                {text}
            </span>
        </li>
    );
}
