import type { TransactionsResponse } from "#/api";
import type { Voidable } from "#/utils";

import { getLogger, hledgerWebApi, makeApiRequest, settingsStore, withLocalStore } from "@/shared";

import type { TransactionDateGroups } from "./models";

import { goupTransactionsByDay } from "../lib";

type TranssactionsStoreState = {
	transactions: TransactionsResponse;
	transactionsCount: number;
	transactionsGroups: TransactionDateGroups;
};

type TransactionsStoreActions = {
	loadTransactions: () => Promise<Voidable<true>>;
};

export type TransactionsStore = {
	actions: TransactionsStoreActions;
	state: TranssactionsStoreState;
};

const logger = getLogger("Transactions Store");

const createTransactionsStore = (): TransactionsStore => {
	let [state, setState] = createStore<TranssactionsStoreState>({
		transactions: [],
		transactionsCount: 0,
		transactionsGroups: {},
	});

	let actions: TransactionsStoreActions = {
		loadTransactions: async () => {
			return makeApiRequest({
				onRequestError: (errorData) => {
					logger.error("Failed to load transactions.");

					throw errorData;
				},
				request: async () => {
					let transactions = await hledgerWebApi.getTransactions();
					let transactionsGroups = goupTransactionsByDay(transactions);

					setState({ transactions, transactionsCount: transactions.length, transactionsGroups });
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

export const [useTransactionsStore, withTransactionsStore] = withLocalStore<TransactionsStore>(createTransactionsStore);
