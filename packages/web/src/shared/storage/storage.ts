import { makePersisted } from "@solid-primitives/storage";

import type { Theme } from "#/styles";
import type { Nullable } from "#/utils";

import { getLogger } from "../log";

const logger = getLogger("LocalStorage");

export const StorageKey = {
	Theme: "theme",
	TransactionsHighlight: "transactions-highlight",
} as const;

export type StorageKey = (typeof StorageKey)[keyof typeof StorageKey];

export type StoreageValue = {
	[StorageKey.Theme]: Nullable<Theme>;
	[StorageKey.TransactionsHighlight]: boolean;
};

const defaultStoreValue: StoreageValue = {
	[StorageKey.Theme]: null,
	[StorageKey.TransactionsHighlight]: false,
};

export const [storage, setStorage, initStorage] = makePersisted(createStore({ ...defaultStoreValue }), {
	deserialize: (v: string) => {
		try {
			return JSON.parse(v);
		} catch (error) {
			logger.error("Deserializer error", error);

			return null;
		}
	},
});
