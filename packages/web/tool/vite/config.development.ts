import type { UserConfig } from "vite";

import basicSsl from "@vitejs/plugin-basic-ssl";
import { loadEnv } from "vite";

export const getDevelopmentConfig = (): UserConfig => {
	let { VITE_HLEDGER_URL } = loadEnv("development", process.cwd());

	return {
		build: {
			sourcemap: true,
		},
		logLevel: "info",
		plugins: [basicSsl()],
		server: {
			host: true,
			proxy: {
				"^(/hledger-api)": {
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/hledger-api/, ""),
					secure: false,
					target: VITE_HLEDGER_URL,
				},
			},
			strictPort: true,
		},
	};
};
