import type { UserConfigExport } from "vite";

import autoprefixer from "autoprefixer";
import postcss100VhFix from "postcss-100vh-fix";
import postcssDarkThemeClass from "postcss-dark-theme-class";
import postcssImport from "postcss-import";
import postcssNormalize from "postcss-normalize";
import postcssPresetEnv from "postcss-preset-env";
import { loadEnv } from "vite";
import z from "zod";

import { createPlugins } from "./plugins";
import { pathResolve, root } from "./utils";

const envSchema = z.object({
	VITE_HLEDGER_PASSWORD: z.string(),
	VITE_HLEDGER_URL: z.string(),
	VITE_HLEDGER_USERNAME: z.string(),
});

const preprocessorConfig = {
	alias: {
		find: "@styles",
		replacement: `${pathResolve("src/shared/ui/styles")}`,
	},
	options: {
		scss: {
			additionalData: `@use "@styles/_abstracts" as *;`,
		},
	},
};

export const getCommonConfig = async (mode: string, command: string): Promise<UserConfigExport> => {
	let env = loadEnv(mode, root);

	envSchema.parse(env);

	let { VITE_BUILD_COMPRESS = "none", VITE_ENABLE_ANALYZE = "false" } = env;

	return {
		css: {
			modules: {
				generateScopedName: "[local]",
			},
			postcss: {
				plugins: [
					postcssImport(),
					postcss100VhFix,
					postcssNormalize({
						forceImport: true,
					}),
					autoprefixer,
					postcssPresetEnv({
						browsers: "last 2 versions",
					}),
					postcssDarkThemeClass({
						darkSelector: "[data-theme='dark']",
						lightSelector: "[data-theme='light']",
					}),
				],
			},
			preprocessorOptions: preprocessorConfig.options,
		},
		plugins: await createPlugins({
			command,
			compress: VITE_BUILD_COMPRESS,
			enableAnalyze: VITE_ENABLE_ANALYZE === "true",
			mode,
			preprocessorConfig,
		}),
		resolve: {
			alias: [
				preprocessorConfig.alias,
				{
					find: /@\//,
					replacement: `${pathResolve("src")}/`,
				},
				{
					find: /#\//,
					replacement: `${pathResolve("types")}/`,
				},
			],
		},
		root: `${pathResolve("")}/`,
	};
};
