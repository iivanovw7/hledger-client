import type { PluginOption } from "vite";

import autoImport from "unplugin-auto-import/vite";
import fonts from "unplugin-fonts/vite";
import { imagetools } from "vite-imagetools";
import dynamicImport from "vite-plugin-dynamic-import";
import solidPlugin from "vite-plugin-solid";

import type { ConfigScssTypesPluginOptions } from "./scss-types";

import { pathResolve } from "../utils";
import { configCompressPlugin } from "./compress";
import { configCopyPlugin } from "./copy";
import { configPwaPlugin } from "./pwa";
import { configScssTypesPlugin } from "./scss-types";
import { configSvgIconsPlugin } from "./svg-icons";
import { configSvgIconsTypePlugin } from "./svg-icons-type";
import { configVisualizerConfig } from "./visualizer";

export type CreatePluginsParameters = {
	command: string;
	compress: string;
	enableAnalyze: boolean;
	mode: string;
} & ConfigScssTypesPluginOptions;

export const createPlugins = async (parameters: CreatePluginsParameters) => {
	let { command, compress, enableAnalyze, mode, preprocessorConfig } = parameters;

	let isTest = mode === "test";
	let isBuild = command === "build";

	let plugins: PluginOption[] = [solidPlugin(), dynamicImport() as PluginOption];

	if (!isTest) {
		// https://github.com/vbenjs/vite-plugin-html/issues/58
		let { configHtmlPlugin } = await import("./html");

		plugins.push(configHtmlPlugin(isBuild));
	}

	plugins.push(
		configSvgIconsTypePlugin(),
		configSvgIconsPlugin(isBuild),
		configScssTypesPlugin({ preprocessorConfig }),
		imagetools({
			include: `${pathResolve("public/img/**/*.{jpeg,jpg,png,webp,gif}?")}/`,
		}) as PluginOption,
		fonts({
			google: {
				display: "swap",
				families: [
					{
						defer: true,
						name: "Source Code Pro",
					},
				],
				injectTo: "head-prepend",
				preconnect: true,
			},
		}),
		autoImport({
			dts: `${pathResolve("types/auto-imports.d.ts")}/`,
			eslintrc: {
				enabled: true,
			},
			imports: [
				"solid-js",
				"vitest",
				{
					from: "solid-js",
					imports: [
						"Show",
						"Match",
						"For",
						"createUniqueId",
						"createResource",
						"createContext",
						"useContext",
					],
				},
				{
					from: "solid-js",
					imports: [
						"Accessor",
						"Component",
						"ParentComponent",
						"JSXElement",
						"JSX",
						"Signal",
						"ParentProps",
						"Setter",
						"ComponentProps",
						"ValidComponent",
					],
					type: true,
				},
				{
					from: "vitest",
					imports: ["Mock"],
					type: true,
				},
			],
		}) as PluginOption,
	);

	if (enableAnalyze) {
		plugins.push(configVisualizerConfig());
	}

	if (isBuild) {
		plugins.push(configCompressPlugin({ compress }));
		plugins.push(configCopyPlugin());
		plugins.push(configPwaPlugin());
	}

	return plugins;
};
