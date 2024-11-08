export const createGenerateId = (baseId: Accessor<string>) => {
	return (suffix: string) => `${baseId()}-${suffix}`;
};
