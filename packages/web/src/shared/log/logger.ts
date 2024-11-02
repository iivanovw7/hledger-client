import type { Logger, LogLevelDesc, LogLevel as LogLevelOptions } from "loglevel";

import logger from "loglevel";

export const LogLevel = {
	DEBUG: "debug",
	ERROR: "error",
	INFO: "info",
	SILENT: "silent",
	TRACE: "trace",
	WARN: "warn",
} as const satisfies { [Key in keyof LogLevelOptions]: LogLevelDesc };

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

export const setLogLevel = (level: LogLevelDesc): void => {
	logger.setLevel(level);
};

export const getLogger = (loggerName: string): Logger => logger.getLogger(loggerName || "");
