import type { PluginOption } from "vite";

import visualizer from "rollup-plugin-visualizer";

export const configVisualizerConfig = () => {
	return visualizer({
		filename: "./build/visualizer/stats.html",
		template: "sunburst",
	}) as PluginOption;
};
