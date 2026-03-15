import { Badge } from "@/client/components/ui";
import { cn } from "@/client/lib/cn";
import { PhoneMockup } from "./phone-mockup";

/**
 * Business use case section showing mass ordering demo
 */
export function UseCaseBusiness() {
    return (
        <section className="bg-neutral-950 py-20 sm:py-32 text-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
                    <div className="relative">
                        {/* Glow effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-blue-500/20 blur-[120px] rounded-full" />

                        <div className="relative z-10 flex -space-x-12 justify-center">
                            <PhoneMockup className="scale-90 opacity-40 blur-[2px] rotate-[-12deg]">
                                <div className="h-full bg-neutral-900 p-4" />
                            </PhoneMockup>
                            <PhoneMockup className="z-20 border-blue-500/50 shadow-blue-500/20">
                                <div className="h-full bg-neutral-900 p-4 font-mono text-[10px] text-blue-400">
                                    <div className="border-b border-neutral-800 pb-2 mb-4">
                                        <div className="text-white font-bold text-xs">MassOrder Dashboard</div>
                                        <div className="text-[8px] opacity-60">12 workers active</div>
                                    </div>

                                    <div className="space-y-3">
                                        <Row status="Success" num="+1 202 555 0143" app="Google" />
                                        <Row status="Success" num="+1 202 555 0192" app="Telegram" />
                                        <Row status="Pending" num="+1 202 555 0188" app="WhatsApp" active />
                                        <Row status="Success" num="+1 202 555 0121" app="Google" />
                                        <Row status="Success" num="+1 202 555 0155" app="Instagram" />
                                    </div>

                                    <div className="mt-8 p-3 rounded bg-blue-500/10 border border-blue-500/30">
                                        <div className="text-white mb-1 uppercase text-[8px] tracking-wider font-bold">API Key Active</div>
                                        <div className="truncate opacity-50 font-sans">sk_live_51Msz...</div>
                                    </div>
                                </div>
                            </PhoneMockup>
                            <PhoneMockup className="scale-90 opacity-40 blur-[2px] rotate-[12deg]">
                                <div className="h-full bg-neutral-900 p-4" />
                            </PhoneMockup>
                        </div>
                    </div>

                    <div>
                        <Badge variant="blue" className="bg-blue-500/10 border-blue-500/20 text-blue-400 font-semibold px-4 py-1.5 opacity-90">
                            For business
                        </Badge>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl leading-tight">
                            Mass order & automated growth
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-neutral-400">
                            Scale your operations with our high-throughput API. Create thousands of accounts across any platform with guaranteed delivery and ultra-low latency.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
                            <div>
                                <div className="text-xl font-bold text-white mb-2">MassOrder</div>
                                <div className="text-neutral-400 text-sm leading-relaxed">Request 100+ numbers in a single API call for bulk account creation.</div>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-white mb-2">API Access</div>
                                <div className="text-neutral-400 text-sm leading-relaxed">SDKs and thorough documentation for Python, JS, and PHP integrations.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Row({ status, num, app, active }: { status: string; num: string; app: string; active?: boolean }) {
    return (
        <div className={cn("p-1.5 rounded flex justify-between items-center transition-colors", active ? "bg-blue-500/20 ring-1 ring-blue-500/30 shadow-lg shadow-blue-500/10" : "bg-neutral-800/50")}>
            <div>
                <div className="text-white font-bold text-[9px]">{app}</div>
                <div className="opacity-60 text-[8px]">{num}</div>
            </div>
            <div className={cn("px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-tighter", status === "Success" ? "bg-green-500/20 text-green-400" : "animate-pulse bg-blue-500/20 text-blue-400")}>
                {status}
            </div>
        </div>
    );
}
