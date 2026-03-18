// Main exports
export { Logger, createLogger } from "./logger";
export { getLogger, createModuleLogger, default as logger } from "./global";

// Type exports
export type {
    LogLevel,
    LogEntry,
    LoggerConfig,
    LoggerContext,
    SerializerOptions,
    TableOptions,
    Environment,
    RuntimeMode,
    ErrorInfo,
    JSONLogEntry,
    BrowserStyle,
    TimerEntry,
} from "./types";

// Constants (for advanced usage)
export {
    LOG_LEVEL_PRIORITY,
    LOG_LEVEL_ICONS,
    LOG_LEVEL_BADGES,
    DEFAULT_CONFIG,
    TREE_CHARS,
} from "./types";

// Utility exports (for advanced users)
export {
    isServer,
    isClient,
    isEdgeRuntime,
    getEnvironment,
    getRuntimeMode,
    isDevelopment,
    isProduction,
    isTest,
    formatDuration,
    safeStringify,
} from "./utils";
