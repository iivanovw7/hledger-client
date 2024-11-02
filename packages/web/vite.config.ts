import { getConfig } from "./tool/vite";

// eslint-disable-next-line import/no-default-export
export default getConfig({
	overrides: {
		server: {
			port: 3050,
		},
	},
});
