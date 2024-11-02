import { getOwner } from "solid-js";

export const tryOnCleanup = (function_: () => void) => {
	if (getOwner()) {
		onCleanup(function_);

		return true;
	}

	return false;
};
