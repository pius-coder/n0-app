"use client";

import * as React from "react";
import { Button } from "@/client/components/ui/optics/button";
import { Badge } from "@/client/components/ui/optics/badge";
import { Coins, Zap, Timer } from "lucide-react";
import { cn } from "@/client/lib/utils";
import { motion } from "motion/react";

const plans = [
    {
        name: "Pack Starter",
        price: "2 000",
        currency: "FCFA",
        credits: "50 Crédits",
        oldPrice: "2 500",
        popular: false,
    },
    {
        name: "Pack Pro",
        price: "5 000",
        currency: "FCFA",
        credits: "150 Crédits",
        oldPrice: "7 500",
        popular: true,
    },
    {
        name: "Pack Elite",
        price: "15 000",
        currency: "FCFA",
        credits: "500 Crédits",
        oldPrice: "22 500",
        popular: false,
    }
];

function Countdown() {
    const [timeLeft, setTimeLeft] = React.useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    React.useEffect(() => {
        const target = new Date();
        target.setHours(target.getHours() + 4); // 4 hours from now

        const timer = setInterval(() => {
            const now = new Date();
            const diff = target.getTime() - now.getTime();

            if (diff <= 0) {
                clearInterval(timer);
                return;
            }

            setTimeLeft({
                hours: Math.floor(diff / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const format = (n: number) => n.toString().padStart(2, '0');

    return (
        <div className="flex gap-4 font-mono text-2xl font-bold text-secondary">
            <div className="flex flex-col items-center">
                <span>{format(timeLeft.hours)}</span>
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Hrs</span>
            </div>
            <span className="animate-pulse">:</span>
            <div className="flex flex-col items-center">
                <span>{format(timeLeft.minutes)}</span>
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Min</span>
            </div>
            <span className="animate-pulse">:</span>
            <div className="flex flex-col items-center">
                <span>{format(timeLeft.seconds)}</span>
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Sec</span>
            </div>
        </div>
    );
}

export function LandingPricing() {
    return (
        <section className="py-24 space-y-20">
            <div className="text-center space-y-8 max-w-3xl mx-auto px-4">
                <Badge variant="outline" className="px-5 py-2 text-secondary font-bold border-secondary/20 bg-secondary/10 font-mono">
                    <Timer className="size-3 mr-2 animate-spin-slow" /> OFFRE LIMITÉE : -30% SUR TOUT
                </Badge>

                <h2 className="text-4xl md:text-7xl font-bold text-foreground tracking-tighter">
                    Prenez vos crédits,<br />
                    <span className="text-primary font-serif italic font-medium">activez vos comptes.</span>
                </h2>

                <div className="flex flex-col items-center gap-4 bg-muted border border-border p-8 rounded-[2.5rem] shadow-sm max-w-sm mx-auto">
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Fin de la promotion dans :</p>
                    <Countdown />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
                {plans.map((plan, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                            "relative bg-card rounded-[3.5rem] p-12 border transition-all duration-500 flex flex-col items-center text-center h-full group",
                            plan.popular ? "border-primary shadow-lg ring-4 ring-primary/10" : "border-border shadow-sm hover:border-border/80"
                        )}
                    >
                        {plan.popular && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-8 py-2.5 rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-lg">
                                Best Seller
                            </div>
                        )}

                        <div className="space-y-8 w-full">
                            <div className="space-y-2">
                                <h3 className="text-3xl font-bold text-foreground tracking-tighter font-serif italic">{plan.name}</h3>
                                <div className="text-sm font-bold font-mono text-muted-foreground line-through tracking-wider">{plan.oldPrice} FCFA</div>
                            </div>

                            <div className="flex flex-col items-center gap-1">
                                <div className="flex items-baseline justify-center gap-1 md:gap-2 font-mono w-full">
                                    <span className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground whitespace-nowrap">{plan.price}</span>
                                    <span className="text-sm sm:text-lg lg:text-xl font-bold text-muted-foreground uppercase tracking-widest">{plan.currency}</span>
                                </div>
                                <Badge className="w-fit bg-primary/10 text-primary border-primary/20 font-bold text-sm sm:text-base lg:text-lg py-1.5 sm:py-2 px-4 sm:px-6 rounded-2xl mt-4">
                                    <Coins className="size-4 sm:size-5 mr-2 sm:mr-3" /> {plan.credits}
                                </Badge>
                            </div>

                            <Button
                                onClick={() => { }}
                                size="lg"
                                className={cn(
                                    "w-full rounded-[2rem] py-6 sm:py-8 lg:py-10 mt-8 sm:mt-12 text-lg sm:text-xl font-bold transition-transform group-hover:scale-[1.02]",
                                    plan.popular
                                        ? "bg-primary text-primary-foreground shadow-lg"
                                        : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                                )}
                            >
                                Acheter Maintenant
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <p className="text-center text-muted-foreground font-semibold text-sm tracking-tight italic">
                * Les crédits n0 n'expirent jamais. Utilisez-les quand vous voulez.
            </p>
        </section>
    );
}
