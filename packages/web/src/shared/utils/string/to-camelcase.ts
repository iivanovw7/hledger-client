export type ToCamelCase<T> = T extends `${infer P1}-${infer P2}-${infer P3}-${infer P4}`
	? `${P1}${Capitalize<P2>}${Capitalize<P3>}${Capitalize<P4>}`
	: T extends `${infer P1}-${infer P2}-${infer P3}`
		? `${P1}${Capitalize<P2>}${Capitalize<P3>}`
		: T extends `${infer P1}-${infer P2}`
			? `${P1}${Capitalize<P2>}`
			: T extends string
				? T
				: never;

export const toCamelCase = <T extends string>(s: T) => {
	return s.replaceAll(/-./g, (match) => match[1].toUpperCase()) as ToCamelCase<T>;
};
