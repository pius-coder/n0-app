import type { UserServer } from "@/shared/types";
import { cn } from "@/client/lib/utils";

type ServerInfoProps = {
    server: UserServer;
    className?: string;
};

export function ServerInfo({ server, className }: ServerInfoProps) {
    return (
        <div className={cn("flex items-center gap-5 flex-1 min-w-0 transition-all duration-300", className)}>
            {/* Avatar Image */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-brand-surface2 shadow-sm border border-brand-border/30">
                {server.avatarUrl ? (
                    <img
                        src={server.avatarUrl}
                        alt={server.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-brand-surface2 text-brand-muted">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                            <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Meta */}
            <div className="flex-1 min-w-0">
                <p className="font-sans text-base font-bold text-brand-text truncate">
                    {server.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-[10px] text-brand-text/30 font-medium">
                        {server.serverId}
                    </span>
                </div>
            </div>
        </div>
    );
}
