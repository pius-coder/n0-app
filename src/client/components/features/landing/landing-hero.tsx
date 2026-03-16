"use client";

import Image from "next/image";
import { Badge } from "@/client/components/ui/optics/badge";
import { Button } from "@/client/components/ui/optics/button";
import { Star, CheckCircle2 } from "lucide-react";

interface LandingHeroProps {
    onJoinWaitlist: () => void;
}

const flags = [
    { icon: "twemoji:flag-france", name: "France" },
    { icon: "twemoji:flag-cote-divoire", name: "Côte d'Ivoire" },
    { icon: "twemoji:flag-senegal", name: "Sénégal" },
    { icon: "twemoji:flag-united-states", name: "USA" },
    { icon: "twemoji:flag-cameroon", name: "Cameroun" },
];

export function LandingHero({ onJoinWaitlist }: LandingHeroProps) {
    return (
        <section className="relative pt-8 md:pt-16 pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6 z-10">
            <div className="flex flex-col lg:flex-row lg:items-center gap-10 md:gap-16 justify-between">

                {/* Left Content */}
                <div className="lg:w-[55%] space-y-8 md:space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000">
                    <div className="space-y-4 md:space-y-6">
                        <Badge variant="outline" className="text-[10px] uppercase font-bold text-secondary tracking-[0.2em] bg-secondary/10 border-border py-2 px-4 font-mono w-fit inline-flex items-center">
                            <Star className="size-3 mr-2 fill-secondary shrink-0" /> DISPONIBILITÉ GÉANTE : +150 PAYS
                        </Badge>
                        <h1 className="leading-[1.1] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tighter">
                            Des numéros<br />
                            <span className="text-primary font-serif italic font-medium">en un clic.</span>
                        </h1>
                    </div>

                    <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed max-w-xl">
                        Achetez un numéro virtuel et recevez vos SMS OTP <span className="font-serif italic text-foreground">instantanément</span>.
                        Sans engagement, juste l'essentiel pour activer vos comptes et préserver votre vie privée.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                        <Button
                            onClick={onJoinWaitlist}
                            size="lg"
                            className="w-full sm:w-auto rounded-full px-10 py-7 md:px-12 md:py-9 text-lg md:text-xl font-bold shadow-xl shadow-primary/20 active:scale-95 transition-transform bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                            Acheter un numéro
                        </Button>
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2.5">
                                {flags.map((flag, i) => (
                                    <div key={i} className="size-8 md:size-9 rounded-full border-2 border-background overflow-hidden shadow-sm bg-muted flex items-center justify-center shrink-0">
                                        <span className="iconify text-lg md:text-xl" data-icon={flag.icon}></span>
                                    </div>
                                ))}
                            </div>
                            <span className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest font-mono">Support Mondial</span>
                        </div>
                    </div>

                    <div className="pt-4 md:pt-8 flex flex-wrap gap-6 md:gap-8 lg:gap-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-300">
                        <span className="iconify text-3xl md:text-4xl hover:!opacity-100 transition-opacity" data-icon="logos:whatsapp-icon"></span>
                        <span className="iconify text-3xl md:text-4xl hover:!opacity-100 transition-opacity" data-icon="logos:facebook"></span>
                        <span className="iconify text-3xl md:text-4xl hover:!opacity-100 transition-opacity" data-icon="logos:telegram"></span>
                        <span className="iconify text-3xl md:text-4xl hover:!opacity-100 transition-opacity" data-icon="logos:netflix-icon"></span>
                    </div>
                </div>

                {/* Right Visual - Mobile Optimized (No extreme scroll animations) */}
                <div className="lg:w-[45%] relative w-full flex justify-center mt-10 lg:mt-0">
                    <div className="relative w-full max-w-md mx-auto aspect-square md:aspect-auto animate-in fade-in zoom-in-95 duration-1000 delay-300 block">

                        {/* Static Glow effect, better for mobile battery */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/20 blur-[80px] rounded-full -z-10 animate-pulse"></div>

                        <Image
                            src="/phone-app.png"
                            alt="n0 Interface"
                            width={500}
                            height={500}
                            className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)] scale-[1.1] md:scale-100 origin-center"
                            priority
                            unoptimized
                        />

                        {/* Static Success Badge aligned properly for mobile */}
                        <div className="absolute bottom-4 right-0 sm:-right-4 bg-background/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-border flex items-center gap-3 sm:gap-4 z-20 animate-in fade-in slide-in-from-right-8 duration-1000 delay-700">
                            <div className="size-10 sm:size-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                                <CheckCircle2 className="size-5 sm:size-6" />
                            </div>
                            <div className="text-left">
                                <div className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-mono leading-none mb-1">Status</div>
                                <div className="text-base sm:text-lg font-bold text-foreground tracking-tighter">
                                    Activé <span className="text-primary font-serif italic text-sm sm:text-base font-medium ml-0.5">à l'instant</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
