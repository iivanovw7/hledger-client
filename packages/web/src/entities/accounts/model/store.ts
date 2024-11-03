import type { AccountNameListResponse } from "#/api";
import type { Voidable } from "#/utils";

import { getLogger, hledgerWebApi, makeApiRequest, settingsStore, withLocalStore } from "@/shared";

type AccountsStoreState = {
	accountNames: AccountNameListResponse;
};

type AccountsStoreActions = {
	loadAccountNames: () => Promise<Voidable<true>>;
};

export type AccountsStore = {
	actions: AccountsStoreActions;
	state: AccountsStoreState;
};

const logger = getLogger("Account Store");

const createAccountsStore = (): AccountsStore => {
	let [state, setState] = createStore<AccountsStoreState>({
		accountNames: [],
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
	};

	return {
		actions,
		state,
	};
};

export const [useAccountsStore, withAccountsStore] = withLocalStore<AccountsStore>(createAccountsStore);
