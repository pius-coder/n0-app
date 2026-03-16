import Link from "next/link";
import { cn } from "@/client/lib/utils";

type AppLogoProps = {
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
    href?: string;
};

const sizeClasses = {
    sm: "text-[20px]",
    md: "text-[26px]",
    lg: "text-[32px]",
    xl: "text-[40px]",
};

export function AppLogo({ className, size = "md", href = "/" }: AppLogoProps) {
    return (
        <Link
            href={href}
            className={cn(
                "font-display font-extrabold tracking-tight text-brand-text active:scale-95 transition-transform",
                sizeClasses[size],
                className
            )}
        >
            _n<span className="font-normal text-brand-muted">0</span>
        </Link>
    );
}
