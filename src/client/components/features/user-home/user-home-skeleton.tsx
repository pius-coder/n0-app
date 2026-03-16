export function UserHomeSkeleton() {
  return (
    <div className="flex flex-col gap-4 px-5 py-4 animate-pulse">
      {/* Server card skeleton */}
      <div className="h-32 w-full rounded-4xl bg-brand-surface2" />

      {/* Balance card skeleton */}
      <div className="h-44 w-full rounded-4xl bg-brand-surface2" />

      {/* Services skeleton */}
      <div className="h-4 w-20 rounded-full bg-brand-surface2" />
      <div className="overflow-hidden rounded-4xl bg-brand-surface2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-brand-border px-4 py-4 last:border-0"
          >
            <div className="h-12 w-12 shrink-0 rounded-2xl bg-brand-surface" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-28 rounded-full bg-brand-surface" />
              <div className="h-3 w-20 rounded-full bg-brand-surface" />
            </div>
            <div className="h-6 w-12 rounded-full bg-brand-surface" />
          </div>
        ))}
      </div>
    </div>
  );
}
