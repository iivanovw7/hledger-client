export const createRegisterId = (setter: Setter<string | undefined>) => {
	return (id: string) => {
		setter(id);

		return () => setter(undefined);
	};
};
