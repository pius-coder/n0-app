"use client"

import { useState } from "react";
import { Button } from "@/client/components/ui/optics/button";
import { ServerCardHeader } from "./server-card-header";
import { ServerSelector } from "./server-selector";
import type { UserServer } from "@/shared/types";
import { cn } from "@/client/lib/utils";

type ServerCardProps = {
  server: UserServer;
  onRecharge?: () => void;
  onViewNumbers?: () => void;
};

// Mock data for other servers with avatarUrl
const MOCK_ALL_SERVERS: UserServer[] = [
  {
    id: "srv-000",
    name: "Défaut",
    serverId: "def-001",
    status: "online" as any,
    avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=def"
  },
  {
    id: "srv-001",
    name: "Dubai Pro",
    serverId: "dx_220",
    status: "online" as any,
    avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=dx"
  },
  {
    id: "srv-002",
    name: "Paris Ultra",
    serverId: "fr_880",
    status: "online" as any,
    avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=fr"
  },
  {
    id: "srv-003",
    name: "Tokyo Zen",
    serverId: "jp_440",
    status: "offline" as any,
    avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=jp"
  },
];

export function ServerCard({ server, onRecharge, onViewNumbers }: ServerCardProps) {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  // Ensure the current server is included in the options and has an avatar if mock doesn't provide it
  const currentWithAvatar = {
    ...server,
    avatarUrl: server.avatarUrl || "https://api.dicebear.com/7.x/identicon/svg?seed=main"
  };

  const allServers = [
    currentWithAvatar,
    ...MOCK_ALL_SERVERS.filter(s => s.id !== server.id)
  ];

  return (
    <div className="w-full rounded-4xl bg-brand-surface p-2 shadow-card overflow-hidden transition-all duration-300">
      {/* Header View */}
      <ServerCardHeader
        currentServer={currentWithAvatar}
        isSelectorOpen={isSelectorOpen}
        onToggle={() => setIsSelectorOpen(!isSelectorOpen)}
      />

      {/* Vertical Sliding Selector with Inline Style Animation */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out min-h-0"
        style={{
          maxHeight: isSelectorOpen ? "800px" : "0px",
          opacity: isSelectorOpen ? 1 : 0,
          pointerEvents: isSelectorOpen ? "auto" : "none"
        }}
      >
        <div className="mx-8 h-px bg-brand-border/40" />
        <ServerSelector
          servers={allServers}
          currentServerId={currentWithAvatar.id}
          onSelect={(s) => {
            console.log('Switched to:', s.name);
            setIsSelectorOpen(false);
          }}
        />
      </div>

      {/* Divider (Main) */}
      <div className={cn("mx-4 h-px bg-brand-border transition-all duration-300", isSelectorOpen ? "opacity-20 translate-y-2" : "opacity-100")} />

      {/* Actions */}
      <div className="flex gap-4 p-5">
        <Button
          variant="default"
          onClick={onRecharge}
          className="h-auto flex-1 rounded-2xl py-5 font-display text-lg font-bold tracking-tight shadow-md! transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg width="24" height="24" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <rect x="1" y="1" width="14" height="14" rx="3.5" />
            <line x1="8" y1="4.5" x2="8" y2="11.5" />
            <line x1="4.5" y1="8" x2="11.5" y2="8" />
          </svg>
          Recharge
        </Button>

        <Button
          variant="secondary"
          onClick={onViewNumbers}
          className="h-auto flex-1 rounded-2xl border-none! bg-brand-surface2 py-5 font-body text-lg font-semibold text-brand-text shadow-none! transition-all hover:bg-brand-surface2/80 hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Mes Numéros
        </Button>
      </div>
    </div>
  );
}
