import type { ConfigurableWindow } from "#/utils";

import { getLogger } from "../../log";
import { env } from "../env";

const logger = getLogger("useMediaQuery");

export const useMediaQuery = (query: string, options: ConfigurableWindow = {}) => {
	let { window = env.defaultWindow } = options;

	if (!(window && env.isMediaQuerySupported)) {
		logger.warn("mediaQuery is not supported");

		return () => false;
	}

	let mediaQuery = window.matchMedia(query);
	let [matches, setMatches] = createSignal(mediaQuery.matches);
	let updateMatch = () => setMatches(mediaQuery.matches);

	mediaQuery.addEventListener("change", updateMatch);

	onCleanup(() => mediaQuery.removeEventListener("change", updateMatch));

	return matches;
};
