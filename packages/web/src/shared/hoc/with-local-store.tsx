import type { ParentComponent } from "solid-js";

import type { AnyStore } from "#/common";

export type UseLocalStore<Store extends AnyStore> = () => Store;

export type WithLocalStoreProvider = {
	(Cmp: ParentComponent): Component;
};

type Result<Store extends AnyStore> = [
	useLocalStore: UseLocalStore<Store>,
	withLocalStoreProvider: WithLocalStoreProvider,
];

export const withLocalStore = <Store extends AnyStore>(storeConstructor: () => Store): Result<Store> => {
	let store = storeConstructor();
	let LocalStoreContext = createContext<Store>(store);

	let useLocalStore = () => useContext<Store>(LocalStoreContext);

	let withLocalStoreProvider = (Cmp: ParentComponent): Component => {
		return (properties) => (
			<LocalStoreContext.Provider value={store}>
				<Cmp {...properties} />
			</LocalStoreContext.Provider>
		);
	};

	return [useLocalStore, withLocalStoreProvider];
};
