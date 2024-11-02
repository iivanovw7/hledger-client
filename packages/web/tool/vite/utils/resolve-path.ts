import { resolve } from "node:path";

export const root = process.cwd();

export const pathResolve = (pathname: string) => {
	return resolve(root, ".", pathname);
};
