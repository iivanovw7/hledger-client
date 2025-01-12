import type { Maybe } from "#/utils";

import { setStorage, storage, StorageKey } from "./storage";

export const setTransactionsHighlight = (isEnabled?: Maybe<boolean>): void => {
	setStorage(StorageKey.TransactionsHighlight, !!isEnabled);
};

export const getTransactionsHighlight = (): boolean => {
	return !!storage[StorageKey.TransactionsHighlight];
};
