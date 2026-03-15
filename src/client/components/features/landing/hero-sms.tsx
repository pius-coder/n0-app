import { Button } from "@/client/components/ui";
import { cn } from "@/client/lib/cn";

/**
 * Hero section for SMS verification platform
 */
export function HeroSms() {
    return (
        <section className="relative overflow-hidden pt-20 pb-16 sm:pt-32 sm:pb-24">
            {/* Background Decorative Bubbles */}
            <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-blue-100/50 blur-3xl opacity-50" />
            <div className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-violet-100/50 blur-3xl opacity-50" />

            <div className="container relative z-10 mx-auto px-4 text-center">
                {/* Floating Badges */}
                <div className="mb-8 flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <FloatingBadge text="Millions of SMS" color="blue" delay="0s" />
                    <FloatingBadge text="Cheap prices" color="green" delay="0.2s" />
                    <FloatingBadge text="Huge assortment" color="violet" delay="0.4s" />
                </div>

                <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-neutral-900 sm:text-7xl">
                    Get SMS verification codes{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                        Anonymously & Instantly
                    </span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 sm:text-xl leading-relaxed">
                    Top up your credits and bypass OTP for any service. Secure your privacy with temporary numbers coverage across 150+ countries.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button size="lg" className="h-14 px-8 text-lg font-semibold shadow-lg shadow-blue-500/20">
                        Quick Order
                    </Button>
                    <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-semibold">
                        Sign Up
                    </Button>
                </div>
            </div>
        </section>
    );
}

function FloatingBadge({ text, color, delay }: { text: string; color: "blue" | "green" | "violet"; delay: string }) {
    const colors = {
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        green: "bg-green-50 text-green-600 border-green-100",
        violet: "bg-violet-50 text-violet-600 border-violet-100",
    };

    return (
        <div
            style={{ animationDelay: delay }}
            className={cn(
                "flex items-center rounded-full border px-4 py-1.5 text-sm font-medium shadow-sm transition-all animate-bounce duration-[3000ms]",
                colors[color]
            )}
        >
            {text}
        </div>
    );
}
