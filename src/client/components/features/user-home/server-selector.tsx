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
                        {index > 0 && <div className="mx-16 h-[px] bg-brand-border/20" />}

                        <button
                            onClick={() => onSelect?.(server)}
                            className={cn(
                                "group flex w-full items-center gap-4 px-4 py-3.5 transition-all active:scale-[0.99]",
                                isActive ? "bg-brand-surface2/30" : "hover:bg-brand-surface2/20"
                            )}
                        >
                            {/* Avatar Image */}
                            <div className={cn(
                                "flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl transition-all duration-300",
                                isActive ? "shadow-sm ring-2 ring-brand-text/10" : "bg-brand-surface2 border border-brand-border/30"
                            )}>
                                {server.avatarUrl && (
                                    <img
                                        src={server.avatarUrl}
                                        alt={server.name}
                                        className="h-full w-full object-cover"
                                    />
                                )}
                            </div>

                            {/* Name & ID */}
                            <div className="flex flex-1 flex-col items-start min-w-0">
                                <span className={cn(
                                    "font-sans text-[15px] font-bold transition-colors",
                                    isActive ? "text-brand-text" : "text-brand-text/50 group-hover:text-brand-text"
                                )}>
                                    {server.name}
                                </span>
                                <span className="font-mono text-[10px] text-brand-text/20 font-bold tracking-tight">
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
