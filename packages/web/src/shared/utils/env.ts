import type { RunningMode } from "#/utils";

import { LogLevel } from "../log";

const isDarkTheme = (): boolean => window.matchMedia("(prefers-color-scheme: dark)").matches;

const isClient = typeof window !== "undefined";

const runningMode: RunningMode = import.meta.env.MODE as RunningMode;

export const env = {
	/*
	 *	App credentianls.
	 */
	credentials: {
		password: import.meta.env.VITE_HLEDGER_PASSWORD,
		url: import.meta.env.VITE_HLEDGER_URL,
		username: import.meta.env.VITE_HLEDGER_USERNAME,
	},
	defaultDocument: isClient ? window.document : undefined,
	defaultLocation: isClient ? window.location : undefined,
	defaultNavigator: isClient ? window.navigator : undefined,
	defaultWindow: isClient ? window : undefined,
	getCssVariable: (variable: string) => {
		// prettier-ignore
		return getComputedStyle(document.documentElement)
			.getPropertyValue(variable)
			.trim();
	},
	/**
	 * Refers to a current document `html` element.
	 */
	html: document.documentElement,
	/**
	 * True if runs in browser environment.
	 */
	isBrowser: Boolean(typeof window !== "undefined" && window.document.createElement),
	/**
	 * Refers true if dark theme is enabled,
	 */
	isDarkTheme: isDarkTheme(),
	/**
	 * Equals `true` is running in development mode.
	 */
	isDevelopment: import.meta.env.DEV,
	isMediaQuerySupported: Boolean("matchMedia" in window && typeof window.matchMedia === "function"),
	/**
	 * Equals `true` is running in production mode.
	 */
	isProduction: import.meta.env.PROD,
	/**
	 * Current logger level mode.
	 */
	logLevel: (() => {
		let logLevel: LogLevel = LogLevel.ERROR;

		if (runningMode === "test") {
			logLevel = LogLevel.SILENT;
		}

		if (runningMode === "development") {
			logLevel = LogLevel.DEBUG;
		}

		return logLevel;
	})(),
	/**
	 * Root portal container.
	 */
	portal: document.getElementById("portal")! as HTMLDivElement,
	/**
	 *	App running mode.
	 */
	runningMode,
};
