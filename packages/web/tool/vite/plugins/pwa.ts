/* eslint-disable camelcase */
import { VitePWA } from "vite-plugin-pwa";

export const configPwaPlugin = () => {
	return VitePWA({
		includeAssets: ["favicon.ico", "favicon.svg", "apple-touch-icon.png", "favicon-48x48.png"],
		manifest: {
			background_color: "#19181a",
			description: "Hledger client app",
			display: "standalone",
			icons: [
				{
					sizes: "192x192",
					src: "web-app-manifest-192x192.png",
					type: "image/png",
				},
				{
					sizes: "512x512",
					src: "web-app-manifest-512x512.png",
					type: "image/png",
				},
			],
			name: "Hledger client",
			short_name: "Hledger",
			theme_color: "#19181a",
		},
		registerType: "autoUpdate",
	});
};
