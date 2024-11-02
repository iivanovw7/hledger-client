import type { UserConfig, UserConfigExport } from "vite";

import { defineConfig, mergeConfig } from "vite";

import { getCommonConfig } from "./config.common";
import { getDevelopmentConfig } from "./config.development";
import { getProductionConfig } from "./config.production";
import { getTestConfig } from "./config.test";

type DefineOptions = {
	options?: {};
	overrides?: UserConfig;
};

export const getConfig = (options: DefineOptions = {}): UserConfigExport => {
	return defineConfig(async ({ command, mode }) => {
		let { overrides = {} } = options;

		let commonConfig = await getCommonConfig(mode, command);

		let mergedConfig = mergeConfig(
			commonConfig as UserConfig,
			(() => {
				switch (mode) {
					case "analyze":
					case "production": {
						return getProductionConfig();
					}
					case "test": {
						return getTestConfig();
					}
					default: {
						return getDevelopmentConfig();
					}
				}
			})(),
		);

		return mergeConfig(mergedConfig, overrides);
	});
};
