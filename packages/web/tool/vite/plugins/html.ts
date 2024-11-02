import { createHtmlPlugin } from "vite-plugin-html";

export const configHtmlPlugin = (isBuild: boolean) => {
	return createHtmlPlugin({
		entry: "./src/main.tsx",
		inject: {
			data: {
				injectScript: '<script type="module" src="./inject.js"></script>',
				title: "Web client for hlegder app",
			},
		},
		minify: isBuild,
		template: "index.html",
	});
};
