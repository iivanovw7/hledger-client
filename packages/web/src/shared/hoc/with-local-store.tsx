import type { AnyStore } from "#/common";
import type { AnyObject } from "#/utils";

export type UseLocalStore<Store extends AnyStore> = () => Store;

export type WithLocalStoreProvider = {
	<Properties extends AnyObject>(Cmp: ParentComponent<Properties>): Component;
};

type Result<Store extends AnyStore> = [
	useLocalStore: UseLocalStore<Store>,
	withLocalStoreProvider: WithLocalStoreProvider,
];

export const withLocalStore = <Store extends AnyStore>(storeConstructor: () => Store): Result<Store> => {
	let store = storeConstructor();
	let LocalStoreContext = createContext<Store>(store);

	let useLocalStore = () => useContext<Store>(LocalStoreContext);

	let withLocalStoreProvider = (Cmp) => (properties) => (
		<LocalStoreContext.Provider value={store}>
			<Cmp {...properties} />
		</LocalStoreContext.Provider>
	);

	return [useLocalStore, withLocalStoreProvider];
};
