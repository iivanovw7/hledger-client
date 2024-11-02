/**
 *	Capitalizes the first letter of a string.
 *	@param value - The string to capitalize.
 *	@returns The string with the first letter capitalized.
 */
export const capitalize = (value: string) => {
	return value.charAt(0).toUpperCase() + value.slice(1);
};
