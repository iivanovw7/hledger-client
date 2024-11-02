import { getConfig } from "@/shared/config/data";

import { env } from "../utils/env";

export const config = getConfig({
	reconfig: {
		logLevel: env.logLevel,
	},
});
