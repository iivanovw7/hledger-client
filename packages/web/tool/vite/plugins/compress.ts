import type { PluginOption } from "vite";

import compressPlugin from "vite-plugin-compression";

export type ConfigureCompressPluginParameters = {
	compress: string;
	deleteOriginFile?: boolean;
};

export const configCompressPlugin = (parameters: ConfigureCompressPluginParameters): PluginOption[] => {
	let { compress, deleteOriginFile = false } = parameters;

	let compressList = compress.split(",");
	let plugins: PluginOption[] = [];

	if (compressList.includes("gzip")) {
		plugins.push(
			compressPlugin({
				deleteOriginFile,
				ext: ".gz",
			}),
		);
	}

	if (compressList.includes("brotli")) {
		plugins.push(
			compressPlugin({
				algorithm: "brotliCompress",
				deleteOriginFile,
				ext: ".br",
			}),
		);
	}

	return plugins;
};
