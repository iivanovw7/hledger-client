import type { UserConfig } from "vite";

import { pathResolve } from "./utils";

const vendorList = ["solid-js", "@solidjs/router", "zod", "ramda", "ramda-adjunct", "axios", "@kobalte/core"];

export const getProductionConfig = (): UserConfig => ({
	build: {
		assetsInlineLimit: 4096,
		chunkSizeWarningLimit: 1500,
		cssCodeSplit: true,
		emptyOutDir: true,
		minify: "esbuild",
		outDir: `${pathResolve("build/dist")}/`,
		reportCompressedSize: false,
		rollupOptions: {
			input: `${pathResolve("index.html")}/`,
			maxParallelFileOps: 3,
			output: {
				manualChunks: (packagePath: string) => {
					if (packagePath.includes("node_modules")) {
						for (let package_ of vendorList) {
							if (packagePath.includes(package_)) {
								return `vendor-${package_}`;
							}
						}

						return "vendor";
					}

					if (packagePath.includes("src/shared/ui/components/index.ts")) {
						return "vendor-components";
					}

					return null;
				},
			},
		},
		sourcemap: false,
		target: "esnext",
	},
});
