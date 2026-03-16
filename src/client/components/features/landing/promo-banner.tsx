"use client";

import { cn } from "@/client/lib/utils";
import * as React from "react";

export function PromoBanner() {
    const [timeLeft, setTimeLeft] = React.useState({ hrs: 0, min: 0, sec: 0 });

    React.useEffect(() => {
        const target = new Date();
        target.setHours(target.getHours() + 4);
        const timer = setInterval(() => {
            const diff = target.getTime() - new Date().getTime();
            if (diff <= 0) return clearInterval(timer);
            setTimeLeft({
                hrs: Math.floor(diff / (1000 * 60 * 60)),
                min: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                sec: Math.floor((diff % (1000 * 60)) / 1000)
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full bg-card border-b border-border text-foreground py-3 flex items-center justify-center gap-4 px-4 relative z-[100] font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.1em]">
            <span className="flex items-center gap-1.5 shrink-0 text-secondary">
                <span className="size-1.5 bg-secondary rounded-full animate-pulse" /> PROMO FLASH -30%
            </span>
            <div className="h-3 w-px bg-border hidden sm:block" />
            <span className="hidden sm:inline opacity-80">Sur toutes vos activations de numéros</span>
            <div className="flex items-center gap-2">
                <span className="opacity-50">FIN DANS</span>
                <span className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded tabular-nums border border-secondary/50">
                    {timeLeft.hrs.toString().padStart(2, '0')}:{timeLeft.min.toString().padStart(2, '0')}:{timeLeft.sec.toString().padStart(2, '0')}
                </span>
            </div>
        </div>
    );
}
