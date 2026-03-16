"use client";

import { cn } from "@/client/lib/utils";

const items = [
    { name: "WhatsApp", icon: "logos:whatsapp-icon" },
    { name: "France", icon: "twemoji:flag-france" },
    { name: "Facebook", icon: "logos:facebook" },
    { name: "Côte d'Ivoire", icon: "twemoji:flag-cote-divoire" },
    { name: "Telegram", icon: "logos:telegram" },
    { name: "Sénégal", icon: "twemoji:flag-senegal" },
    { name: "Instagram", icon: "logos:instagram-icon" },
    { name: "USA", icon: "twemoji:flag-united-states" },
    { name: "TikTok", icon: "logos:tiktok-icon" },
    { name: "Cameroun", icon: "twemoji:flag-cameroon" },
    { name: "Netflix", icon: "logos:netflix-icon" },
    { name: "Mali", icon: "twemoji:flag-mali" },
    { name: "Discord", icon: "logos:discord-icon" },
    { name: "Bénin", icon: "twemoji:flag-benin" },
];

export function LandingLogos() {
    return (
        <div className="w-full py-16 overflow-hidden bg-background/40 backdrop-blur-sm border-y border-border/50">
            <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.4em] mb-2">
                    Global Coverage & Trusted Services
                </p>
                <h3 className="text-2xl font-bold text-foreground tracking-tighter">
                    Une plateforme sans frontières.
                </h3>
            </div>

            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee flex items-center whitespace-nowrap gap-16 md:gap-32 pr-16 md:pr-32">
                    {items.map((item, i) => (
                        <div key={i} className="flex items-center gap-5 grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-30 group-hover:opacity-100">
                            <span className="iconify text-5xl" data-icon={item.icon}></span>
                            <span className="text-2xl font-bold text-foreground tracking-tighter">{item.name}</span>
                        </div>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {items.map((item, i) => (
                        <div key={`dup-${i}`} className="flex items-center gap-5 grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-30 group-hover:opacity-100">
                            <span className="iconify text-5xl" data-icon={item.icon}></span>
                            <span className="text-2xl font-bold text-foreground tracking-tighter">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
