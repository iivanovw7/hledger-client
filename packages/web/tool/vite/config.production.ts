import type { UserConfig } from "vite";

import { pathResolve } from "./utils";

const vendorList = ["solid-js", "@solidjs/router", "zod", "ramda", "ramda-adjunct", "axios"];

export const getProductionConfig = (): UserConfig => ({
	build: {
		chunkSizeWarningLimit: 1500,
		emptyOutDir: true,
		minify: true,
		outDir: `${pathResolve("build/dist")}/`,
		reportCompressedSize: false,
		rollupOptions: {
			input: `${pathResolve("index.html")}/`,
			maxParallelFileOps: 3,
			output: {
				manualChunks: (packagePath: string) => {
					let package_ = packagePath.split("/").reverse();
					let packageName = package_[package_.indexOf("node_modules") - 1];

					return packageName && vendorList.includes(packageName) ? "vendors" : packageName;
				},
			},
		},
	},
	server: {
		proxy: {
			"^(/api)": {
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
				secure: false,
			},
		},
	},
});
