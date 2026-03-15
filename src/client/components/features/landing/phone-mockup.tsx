import { cn } from "@/client/lib/cn";

interface PhoneMockupProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * A highly polished CSS-only phone frame
 */
export function PhoneMockup({ children, className }: PhoneMockupProps) {
    return (
        <div className={cn("relative mx-auto w-full max-w-[300px]", className)}>
            {/* Outer Frame */}
            <div className="relative aspect-[9/19] w-full rounded-[3rem] border-8 border-neutral-900 bg-neutral-900 shadow-2xl overflow-hidden ring-1 ring-neutral-800">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-neutral-900 rounded-b-2xl z-20" />

                {/* Screen Content */}
                <div className="relative h-full w-full bg-white overflow-hidden">
                    {children}
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-neutral-300 rounded-full z-20" />
            </div>

            {/* Decorative side buttons */}
            <div className="absolute -left-2 top-24 w-1 h-12 bg-neutral-800 rounded-l-md" />
            <div className="absolute -left-2 top-40 w-1 h-20 bg-neutral-800 rounded-l-md" />
            <div className="absolute -right-2 top-32 w-1 h-24 bg-neutral-800 rounded-r-md" />
        </div>
    );
}
