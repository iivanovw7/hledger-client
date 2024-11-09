import type { PluginOption } from "vite";

import { viteStaticCopy } from "vite-plugin-static-copy";

import { pathResolve } from "../utils";

export const configCopyPlugin = () => {
	return viteStaticCopy({
		targets: [
			{
				dest: "public",
				src: `${pathResolve("public/img")}/`,
			},
		],
	}) as PluginOption;
};
