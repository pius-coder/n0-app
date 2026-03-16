import type { UserServer } from "@/shared/types";
import { ServerCardToggle } from "./server-card-toggle";
import { ServerInfo } from "./server-info";

type ServerCardHeaderProps = {
    currentServer: UserServer;
    isSelectorOpen: boolean;
    onToggle: () => void;
};

export function ServerCardHeader({ currentServer, isSelectorOpen, onToggle }: ServerCardHeaderProps) {
    return (
        <div className="flex items-center justify-between gap-6 px-6 py-6">
            <ServerInfo server={currentServer} />
            <ServerCardToggle
                isOpen={isSelectorOpen}
                onToggle={onToggle}
            />
        </div>
    );
}
