import path from "node:path";

/**
 *	Extracts the filename from a full file path.
 *	@param filePath - The full path of the file.
 *	@returns The filename with extension.
 */
export const getFileName = (filePath: string): string => {
	return path.basename(filePath);
};
