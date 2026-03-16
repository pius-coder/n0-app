"use client";

import { useTheme } from "next-themes";
import { Button } from "@/client/components/ui/optics/button";
import { ThemeSwitcher } from "@/client/components/ui/optics/theme-switcher";
import { AppLogo } from "@/client/components/common";

interface LandingNavbarProps {
    onJoinWaitlist: () => void;
}

export function LandingNavbar({ onJoinWaitlist }: LandingNavbarProps) {
    const { theme, setTheme } = useTheme();

    return (
        <nav className="flex sticky z-40 transition-all duration-300 bg-background/90 w-full max-w-7xl border-b border-border/50 pt-4 pb-4 px-4 md:px-6 top-0 backdrop-blur-md items-center justify-between mx-auto">
            {/* Logo _n0 */}
            <AppLogo size="md" />

            {/* Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
                <div className="hidden sm:block">
                    <ThemeSwitcher value={theme} onChange={setTheme} />
                </div>
                <Button
                    onClick={onJoinWaitlist}
                    className="rounded-full font-bold px-4 sm:px-6 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    S'inscrire
                </Button>
                <div className="block sm:hidden">
                    <ThemeSwitcher value={theme} onChange={setTheme} />
                </div>
            </div>
        </nav>
    );
}

