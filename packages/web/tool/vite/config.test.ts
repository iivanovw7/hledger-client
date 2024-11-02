import type { UserConfig } from "vite";

import { pathResolve } from "./utils";

export const getTestConfig = (): UserConfig =>
	({
		test: {
			coverage: {
				all: true,
				provider: "istanbul",
				reportsDirectory: `${pathResolve("build/coverage")}/`,
			},
			deps: {
				fallbackCJS: true,
				interopDefault: true,
			},
			environment: "jsdom",
			exclude: ["**/node_modules/**", "**/dist/**", "**/build/**", "**/_helper/**"],
			globals: true,
			include: ["./test/**/*.{ts,tsx}"],
			// eslint-disable-next-line consistent-return
			onConsoleLog: (log) => {
				if (log.includes("computations created outside a `createRoot` or `render` will never be disposed")) {
					return false;
				}
			},
			setupFiles: [`${pathResolve("test/_helper/setup.ts")}/`],
			transformMode: {
				web: [/\.css.ts$/, /\.[jt]sx?$/],
			},
			watch: false,
		},
	}) as UserConfig;
