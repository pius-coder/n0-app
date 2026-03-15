type LogLevel = "debug" | "info" | "warn" | "error";

type LogEntry = {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
};

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const LEVEL_COLORS: Record<LogLevel, string> = {
  debug: "\x1b[90m",
  info: "\x1b[36m",
  warn: "\x1b[33m",
  error: "\x1b[31m",
};

const RESET = "\x1b[0m";

export function createLogger(options?: { minLevel?: LogLevel; prefix?: string }) {
  const minLevel = options?.minLevel ?? "debug";
  const prefix = options?.prefix ?? "_n0";

  function log(level: LogLevel, message: string, data?: unknown) {
    if (LEVEL_PRIORITY[level] < LEVEL_PRIORITY[minLevel]) return;

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
    };

    const color = LEVEL_COLORS[level];
    const tag = `${color}[${prefix}:${level.toUpperCase()}]${RESET}`;

    if (data) {
      console[level === "error" ? "error" : "log"](
        `${tag} ${message}`,
        data
      );
    } else {
      console[level === "error" ? "error" : "log"](`${tag} ${message}`);
    }

    return entry;
  }

  return {
    debug: (msg: string, data?: unknown) => log("debug", msg, data),
    info: (msg: string, data?: unknown) => log("info", msg, data),
    warn: (msg: string, data?: unknown) => log("warn", msg, data),
    error: (msg: string, data?: unknown) => log("error", msg, data),
  };
}
