import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

import { pathResolve } from "../utils";

export const configSvgIconsPlugin = (isBuild: boolean) => {
	return createSvgIconsPlugin({
		iconDirs: [`${pathResolve("public/icons")}/`],
		inject: "body-last",
		svgoOptions: isBuild,
		symbolId: "icon-[dir]-[name]",
	});
};
