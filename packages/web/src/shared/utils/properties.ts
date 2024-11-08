export type OverrideProperties<Source = {}, Override = {}> = Omit<Source, keyof Override> & Override;

export type OverrideComponentProperties<T extends ValidComponent, P> = OverrideProperties<ComponentProps<T>, P>;

export const mergeDefaultProperties = <T extends {}, D extends Partial<T>>(
	defaultProps: D,
	properties: T,
): OverrideProperties<T, D> => {
	return mergeProps(defaultProps, properties) as OverrideProperties<T, D>;
};
