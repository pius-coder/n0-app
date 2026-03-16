"use client";

import { TrendingUpIcon, TrendingDownIcon } from "@/client/components/ui/icons";
import { CurrencyFormatter } from "./currency-formatter";
import type { UserBalance } from "@/shared/types";
import { cn } from "@/client/lib/utils";

type BalanceCardProps = {
  balance: UserBalance;
  className?: string;
};

/**
 * BalanceCard displays the user's current balance in a minimal format.
 * Uses custom Registry icons and Inter (sans-serif) for all labels, with serif only for the amount.
 */
export function BalanceCard({ balance, className }: BalanceCardProps) {
  const isUp = balance.changeDirection === "up";
  const badgeMessage = isUp ? "Crédits ajoutés" : "Crédits débités";

  return (
    <div className={cn("flex flex-col items-center justify-center gap-1 py-6 px-2 text-center", className)}>
      {/* 1. Solde Label */}
      <span className="text-[13px] font-sans font-medium text-brand-text/40 tracking-tight">
        Solde actuel
      </span>

      {/* 2. Balance Amount */}
      <div className="py-1">
        <div className="!text-gradient-premium inline-block">
          <CurrencyFormatter
            amount={balance.amount}
            size="xl"
            showIcon={true}
            className="!text-transparent"
          />
        </div>
      </div>

      {/* 3. Trend Pill */}
      <div
        className={cn(
          "flex items-center gap-2 mt-1 px-3 border-1 py-1.5 rounded-full text-xs font-sans font-medium transition-colors",
          isUp
            ? "text-brand-green bg-brand-green-bg border-brand-green/40"
            : "text-destructive bg-destructive/5 border-destructive/5"
        )}
      >
        {isUp ? (
          <TrendingUpIcon size={12} className="stroke-[3]" />
        ) : (
          <TrendingDownIcon size={12} className="stroke-[3]" />
        )}
        <span>{badgeMessage}</span>
        <span className="font-mono text-[10px]">
          {isUp ? "+" : "-"}{balance.changePercent}%
        </span>
      </div>
    </div>
  );
}
