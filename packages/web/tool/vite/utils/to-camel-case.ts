export const toCamelCase = (value: string) => {
	return value
		.replaceAll(/[_-]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ""))
		.replace(/^\w/, (char) => char.toLowerCase());
};
