const initCallbacks: (() => void)[] = [];

export const controller = {
	init(stores: IGlobalStore) {
		Object.assign(this.stores, stores);

		return () => {
			while (initCallbacks.length) {
				initCallbacks.pop()!();
			}
		};
	},
	onInit: (callback: () => void) => {
		initCallbacks.push(callback);
	},
	stores: {} as IGlobalStore,
};
