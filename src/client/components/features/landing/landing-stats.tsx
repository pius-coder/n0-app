"use client";

import { motion } from "motion/react";

const stats = [
    { label: "Services intégrés", value: "800", suffix: "+" },
    { label: "Pays couverts", value: "150", suffix: "+", color: "primary" },
    { label: "Réception SMS", value: "0.5", suffix: "s" },
];

export function LandingStats() {
    return (
        <section className="bg-muted w-full border border-border rounded-[3.5rem] p-12 md:p-24 shadow-sm relative overflow-hidden group">
            {/* Dynamic Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent -z-10 group-hover:from-primary/10 transition-all duration-1000"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="flex flex-col items-center space-y-4"
                    >
                        <div className="flex items-baseline">
                            <span className={`text-6xl md:text-9xl font-bold tracking-tighter font-mono ${stat.color === 'primary' ? 'text-primary' : 'text-foreground'}`}>
                                {stat.value}
                            </span>
                            <span className="text-3xl md:text-5xl font-medium text-muted-foreground font-serif italic mb-4 ml-2">
                                {stat.suffix}
                            </span>
                        </div>
                        <div className="h-px w-12 bg-border"></div>
                        <div className="text-muted-foreground font-semibold uppercase tracking-[0.3em] text-[10px] md:text-xs">
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
