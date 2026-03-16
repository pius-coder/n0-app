import type { UserServer } from "@/shared/types";
import { cn } from "@/client/lib/utils";

type ServerInfoProps = {
    server: UserServer;
    className?: string;
};

export function ServerInfo({ server, className }: ServerInfoProps) {
    return (
        <div className={cn("flex items-center gap-5 flex-1 min-w-0 transition-all duration-300", className)}>
            {/* Avatar Image (Desktop Size) */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-brand-surface2 shadow-sm border border-brand-border">
                {server.avatarUrl ? (
                    <img
                        src={server.avatarUrl}
                        alt={server.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-brand-surface2 text-brand-muted">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                            <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                            <line x1="6" y1="6" x2="6.01" y2="6" />
                            <line x1="6" y1="18" x2="6.01" y2="18" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Meta */}
            <div className="flex-1 min-w-0">
                <p className="font-display text-xl font-bold tracking-tight text-brand-text truncate">
                    {server.name}
                </p>
                <div className="flex items-center gap-3 mt-1">
                    <span className="font-mono text-xs text-brand-muted uppercase tracking-wider">
                        {server.serverId}
                    </span>

                </div>
            </div>
        </div>
    );
}
