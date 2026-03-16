import type { UserBalance } from "@/shared/types";

type BalanceCardProps = {
  balance: UserBalance;
};

function formatAmount(amount: number): { whole: string; cents: string } {
  const [whole, cents] = amount.toFixed(2).split(".");
  return {
    whole: Number(whole).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
    cents: cents ?? "00",
  };
}

export function BalanceCard({ balance }: BalanceCardProps) {
  const { whole, cents } = formatAmount(balance.amount);
  const isUp = balance.changeDirection === "up";

  // Normalize sparkline to 0–100 range for SVG path
  const min = Math.min(...balance.sparklineData);
  const max = Math.max(...balance.sparklineData);
  const range = max - min || 1;
  const W = 320;
  const H = 44;
  const pts = balance.sparklineData.map((v, i) => {
    const x = (i / (balance.sparklineData.length - 1)) * W;
    const y = H - ((v - min) / range) * (H - 8) - 4;
    return `${x},${y}`;
  });
  const linePath = `M${pts.join(" L")}`;
  const areaPath = `M0,${H} L${pts.join(" L")} L${W},${H}Z`;

  return (
    <div className="relative overflow-hidden rounded-4xl bg-brand-text px-5 py-5">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/[0.03]" />
      <div className="pointer-events-none absolute -bottom-16 -left-5 h-52 w-52 rounded-full bg-white/[0.02]" />

      {/* Top row */}
      <div className="relative flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-white/40">
          Your Balance
        </span>

        <div
          className={[
            "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
            isUp
              ? "border-green-500/30 bg-green-500/[0.15] text-green-400"
              : "border-red-500/30 bg-red-500/[0.15] text-red-400",
          ].join(" ")}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
            <polygon
              points={isUp ? "5,1.5 8.5,8.5 1.5,8.5" : "5,8.5 8.5,1.5 1.5,1.5"}
              fill="currentColor"
            />
          </svg>
          {isUp ? "+" : "-"}{balance.changePercent.toFixed(2)}%
        </div>
      </div>

      {/* Amount */}
      <div className="relative mt-3">
        <span className="font-display text-[46px] font-extrabold leading-none tracking-[-2.5px] text-white">
          {whole}
        </span>
        <span className="font-display text-[46px] font-bold leading-none tracking-[-2px] text-white/30">
          .{cents}
        </span>
      </div>

      {/* Subtitle */}
      <p className="relative mt-2 text-xs text-white/25">
        Solde disponible · Mis à jour à l'instant
      </p>

      {/* Sparkline */}
      <div className="relative mt-4">
        <svg
          width="100%"
          height="44"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(74,222,128,0.22)" />
              <stop offset="100%" stopColor="rgba(74,222,128,0)" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#sparkGrad)" />
          <path d={linePath} fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" />
          {/* Live dot at end */}
          <circle
            cx={W}
            cy={Number(pts[pts.length - 1]?.split(",")[1] ?? 4)}
            r="3.5"
            fill="#4ade80"
          />
          <circle
            cx={W}
            cy={Number(pts[pts.length - 1]?.split(",")[1] ?? 4)}
            r="6"
            fill="rgba(74,222,128,0.2)"
          />
        </svg>
      </div>
    </div>
  );
}
