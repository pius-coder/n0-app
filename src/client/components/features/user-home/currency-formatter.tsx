import { cn } from "@/client/lib/utils";

type CurrencyFormatterProps = {
    amount: number;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
    showIcon?: boolean;
};

export function CurrencyFormatter({
    amount,
    className,
    size = "md",
    showIcon = true,
}: CurrencyFormatterProps) {
    const formattedAmount = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);

    const sizeClasses = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-2xl",
        xl: "text-[46px]",
    };

    return (
        <div className={cn("inline-flex items-center gap-3 font-sans", className)}>

            <span className={cn("relative font-bold flex gap-2 tracking-tight text-brand-text", sizeClasses[size])}>
                <span className="font-serif italic relative inline-block">
                    {formattedAmount}

                </span>
                <div className="flex justify-center items-center">   {showIcon && (
                    <span className={cn("relative text-xs! font-bold tracking-tight text-yellow-500 bg-gray-300/50 h-min", sizeClasses[size])}>
                        credits
                    </span>
                )}</div>
            </span>
        </div>
    );
}
