import type { AccountNameListResponse, AccountsResponse } from "#/api";
import type { Voidable } from "#/utils";

import { getLogger, hledgerWebApi, makeApiRequest, settingsStore, withLocalStore } from "@/shared";

import type { AccountRootItem } from "./models";

import { pickAccountRootItems } from "../lib";

type AccountsStoreState = {
	accountNames: AccountNameListResponse;
	accountRootItems: AccountRootItem[];
	accounts: AccountsResponse;
	accountsCount: number;
};

type AccountsStoreActions = {
	loadAccountNames: () => Promise<Voidable<true>>;
	loadAccounts: () => Promise<Voidable<true>>;
};

export type AccountsStore = {
	actions: AccountsStoreActions;
	state: AccountsStoreState;
};

const logger = getLogger("Accounts Store");

const createAccountsStore = (): AccountsStore => {
	let [state, setState] = createStore<AccountsStoreState>({
		accountNames: [],
		accountRootItems: [],
		accounts: [],
		accountsCount: 0,
	});

	let actions: AccountsStoreActions = {
		loadAccountNames: async () => {
			return makeApiRequest({
				onRequestError: (errorData) => {
					logger.error("Failed to load account names.");

					throw errorData;
				},
				request: async () => {
					let accountNames = await hledgerWebApi.getAccountNames();

					setState({ accountNames });
				},
				setLoading: settingsStore.actions.setGlobalLoading,
			});
		},
		loadAccounts: async () => {
			return makeApiRequest({
				onRequestError: (errorData) => {
					logger.error("Failed to load accounts.");

					throw errorData;
				},
				request: async () => {
					let accounts = await hledgerWebApi.getAccounts();
					let { items: accountRootItems, itemsCount: accountsCount } = pickAccountRootItems(accounts);

					setState({ accountRootItems, accounts, accountsCount });
				},
				setLoading: settingsStore.actions.setGlobalLoading,
			});
		},
	};

	return {
		actions,
		state,
	};
};

export const [useAccountsStore, withAccountsStore] = withLocalStore<AccountsStore>(createAccountsStore);
