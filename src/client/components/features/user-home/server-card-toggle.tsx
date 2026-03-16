"use client";

import { Button } from "@/client/components/ui/optics/button";
import { cn } from "@/client/lib/utils";

type ServerCardToggleProps = {
    isOpen: boolean;
    onToggle: () => void;
    className?: string;
};

export function ServerCardToggle({ isOpen, onToggle, className }: ServerCardToggleProps) {
    return (
        <div className="gap-3 flex flex-col items-end">

            <Button
                variant="secondary"
                size="icon-sm"
                onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                }}
                aria-label={isOpen ? "Close server selection" : "Open server selection"}
                className={cn(
                    "rounded-xl bg-brand-surface2 shadow-none! transition-transform duration-300",
                    isOpen && "rotate-180 bg-brand-text",
                    className
                )}
            >
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path
                        d="M1 1l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </Button>
            <span className="text-[10px] text-primary">
                Changer de serveur
            </span>
        </div>
    );
}
