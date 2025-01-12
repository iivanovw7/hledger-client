import { getTransactionsHighlight, setTransactionsHighlight } from "./settings";
import { getTheme, setTheme } from "./theme";

export { StorageKey } from "./storage";

export const storage = {
	getTheme,
	getTransactionsHighlight,
	setTheme,
	setTransactionsHighlight,
};
