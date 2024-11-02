import type { PluginOption } from "vite";

import { viteStaticCopy } from "vite-plugin-static-copy";

import { pathResolve } from "../utils";

export const configCopyPlugin = () => {
	return viteStaticCopy({
		targets: [
			{
				dest: "assets",
				src: `${pathResolve("assets/img")}/`,
			},
		],
	}) as PluginOption;
};
