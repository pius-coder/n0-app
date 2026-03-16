import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/client/components/ui/optics/button";
import { ThemeSwitcher } from "@/client/components/ui/optics/theme-switcher";
import { AppLogo } from "@/client/components/common";
import { ROUTES } from "@/shared/constants";
import { useAuth } from "@/client/hooks/features/auth/use-auth";

interface LandingNavbarProps { }

export function LandingNavbar({ }: LandingNavbarProps) {
    const { theme, setTheme } = useTheme();
    const { isAuthenticated, user, isLoading } = useAuth();

    return (
        <nav className="flex sticky z-40 transition-all duration-300 bg-background/90 w-full max-w-7xl border-b border-border/50 pt-4 pb-4 px-4 md:px-6 top-0 backdrop-blur-md items-center justify-between mx-auto">
            {/* Logo _n0 */}
            <AppLogo size="md" />

            {/* Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
                <div className="hidden sm:block">
                    <ThemeSwitcher value={theme} onChange={setTheme} />
                </div>

                {!isLoading && (
                    <>
                        {isAuthenticated ? (
                            <div className="flex items-center gap-2">
                                {user?.role === "ADMIN" && (
                                    <Link href={ROUTES.ADMIN}>
                                        <Button variant="outline" className="rounded-full font-bold px-4 hover:bg-muted/50 hidden md:flex border-secondary text-secondary">
                                            Admin
                                        </Button>
                                    </Link>
                                )}
                                <Link href={ROUTES.DASHBOARD}>
                                    <Button className="rounded-full font-bold px-4 sm:px-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                                        Tableau de Bord
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link href={ROUTES.LOGIN}>
                                    <Button variant="ghost" className="rounded-full font-bold px-4 hover:bg-muted/50">
                                        Connexion
                                    </Button>
                                </Link>
                                <Link href={ROUTES.REGISTER}>
                                    <Button
                                        className="rounded-full font-bold px-4 sm:px-6 bg-primary text-primary-foreground hover:bg-primary/90"
                                    >
                                        S'inscrire
                                    </Button>
                                </Link>
                            </>
                        )}
                    </>
                )}

                <div className="block sm:hidden">
                    <ThemeSwitcher value={theme} onChange={setTheme} />
                </div>
            </div>
        </nav>
    );
}

