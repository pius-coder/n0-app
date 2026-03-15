import { Badge } from "@/client/components/ui";
import { PhoneMockup } from "./phone-mockup";

/**
 * Personal use case section showing SMS arrival demo
 */
export function UseCasePersonal() {
    return (
        <section className="py-20 sm:py-32">
            <div className="container mx-auto px-4">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
                    <div className="order-2 lg:order-1">
                        <Badge variant="blue" className="px-3 py-1 text-sm font-semibold">
                            For self usage
                        </Badge>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                            Get codes on your personal dashboard
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-neutral-600">
                            No more giving out your real number. Rent a temporary number for minutes and receive your OTP code instantly in our clean, intuitive dashboard.
                        </p>

                        <ul className="mt-8 space-y-4">
                            <FeatureItem title="Easy to use" description="One-click activation for any major service." />
                            <FeatureItem title="Pay with credits" description="Transparent pricing. No monthly subscriptions." />
                            <FeatureItem title="Global Coverage" description="Numbers from 150+ countries at your fingertips." />
                        </ul>
                    </div>

                    <div className="order-1 lg:order-2">
                        <div className="relative">
                            {/* Decorative background element */}
                            <div className="absolute -inset-4 rounded-[4rem] bg-gradient-to-tr from-blue-50 to-violet-50 blur-2xl" />

                            <PhoneMockup className="relative z-10">
                                <div className="flex h-full flex-col bg-neutral-50 font-sans">
                                    {/* WhatsApp Simulation Header */}
                                    <div className="bg-[#25D366] p-4 text-white">
                                        <div className="text-xs opacity-80">WhatsApp Verification</div>
                                        <div className="text-xl font-bold">Waiting for SMS...</div>
                                    </div>

                                    {/* Dashboard Mockup Content */}
                                    <div className="flex-1 p-6">
                                        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                                            <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Service</div>
                                            <div className="text-lg font-bold text-neutral-900 mb-4">WhatsApp</div>

                                            <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Number</div>
                                            <div className="font-mono text-lg text-blue-600 mb-6">+44 7911 123456</div>

                                            <div className="animate-pulse space-y-3">
                                                <div className="h-px bg-neutral-100" />
                                                <div className="text-center py-4">
                                                    <div className="text-3xl font-bold text-neutral-900 tracking-[0.2em] animate-bounce">
                                                        842-931
                                                    </div>
                                                    <div className="text-xs text-green-600 font-bold mt-2 font-mono">CODE RECEIVED</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex justify-center">
                                            <div className="rounded-full bg-neutral-900 px-6 py-2 text-sm text-white font-semibold shadow-md">
                                                Confirm & Close
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </PhoneMockup>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeatureItem({ title, description }: { title: string; description: string }) {
    return (
        <li className="flex gap-x-3">
            <div className="mt-1 h-5 w-5 flex-none rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
                <div className="h-2 w-2 rounded-full bg-white" />
            </div>
            <span className="text-neutral-600">
                <strong className="font-semibold text-neutral-900">{title}</strong> — {description}
            </span>
        </li>
    );
}
