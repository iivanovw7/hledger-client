import type { Alias } from "vite";

export const resolveAlias = (filePath: string, alias: Alias) => {
	let { find, replacement } = alias;
	let regex = typeof find === "string" ? new RegExp(`^${find}`) : find;

	return regex.test(filePath) ? filePath.replace(regex, replacement) : filePath;
};
