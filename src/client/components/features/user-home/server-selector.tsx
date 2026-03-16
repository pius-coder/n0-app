import type { UserServer } from "@/shared/types";
import { cn } from "@/client/lib/utils";

type ServerSelectorProps = {
    servers: UserServer[];
    currentServerId: string;
    onSelect?: (server: UserServer) => void;
    className?: string;
};

export function ServerSelector({ servers, currentServerId, onSelect, className }: ServerSelectorProps) {
    return (
        <div className={cn("flex flex-col w-full px-0", className)}>
            {servers.map((server, index) => {
                const isActive = server.id === currentServerId;
                return (
                    <div key={server.id} className="w-full">
                        {index > 0 && <div className="mx-20 h-[1px] bg-brand-border/40" />}

                        <button
                            onClick={() => onSelect?.(server)}
                            className={cn(
                                "group flex w-full items-center gap-5 px-6 py-5 transition-all active:scale-[0.99]",
                                isActive ? "bg-brand-surface2/50" : "hover:bg-brand-surface2/40"
                            )}
                        >
                            {/* Avatar Image (Desktop size) */}
                            <div className={cn(
                                "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl transition-all duration-300",
                                isActive ? "shadow-md ring-2 ring-primary ring-offset-2" : "bg-brand-surface2 border border-brand-border group-hover:border-brand-border-md"
                            )}>
                                {server.avatarUrl ? (
                                    <img
                                        src={server.avatarUrl}
                                        alt={server.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-brand-muted">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                                            <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Name & ID */}
                            <div className="flex flex-1 flex-col items-start min-w-0">
                                <span className={cn(
                                    "font-display text-lg font-bold tracking-tight transition-colors",
                                    isActive ? "text-brand-text" : "text-brand-muted group-hover:text-brand-text"
                                )}>
                                    {server.name}
                                </span>
                                <span className="font-mono text-xs text-brand-muted/70 uppercase tracking-wider">
                                    {server.serverId}
                                </span>
                            </div>

                            {/* Status Indicator / Selection State */}
                            <div className="flex items-center gap-3">
                                {isActive ? (
                                    <div className="flex items-center gap-2 rounded-full bg-secondary/10 text-secondary">
                                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                    </div>
                                ) : (
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-muted">
                                            <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
