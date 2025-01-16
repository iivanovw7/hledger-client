import { mergeRight } from "ramda";

import { LogLevel } from "../log/logger";

export type TConfigEnv = {
	reconfig?: {
		logLevel?: LogLevel;
	};
};

export const getConfig = (env: TConfigEnv) => {
	let config = {
		/**
		 * Log level, can be set to below options:
		 *  - error [default, only errors]
		 *  - debug [all levels]
		 *  - off   [no logging]
		 */
		logLevel: LogLevel.DEBUG,
		/**
		 * Network config.
		 */
		net: {
			/**
			 * Default request timeout.
			 */
			requestTimeout: 20000,
		},
		ui: {
			/**
			 * Debounce delay in `ms`.
			 */
			debounce: 100,
			/**
			 * If true, tries to detect transaction direction by account prefix.
			 */
			showTransactionDirection: true,
			/**
			 * Throttle delay in `ms`.
			 */
			throttle: 100,
		},
	};

	return mergeRight(config, env.reconfig || {});
};
