import type { AccountNameListResponse } from "#/api";
import type { Voidable } from "#/utils";

import { getLogger, hledgerWebApi, makeApiRequest, settingsStore } from "@/shared";

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

const [state, setState] = createStore<AccountsStoreState>({
	accountNames: [],
});

const actions: AccountsStoreActions = {
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

/**
 *	Accounts store constructor.
 *		@returns returns store instance.
 */
export const useAccountsStore = (): AccountsStore => ({
	actions,
	state,
});
