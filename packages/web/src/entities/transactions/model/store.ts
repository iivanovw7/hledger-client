import type { TransactionsResponse } from "#/api";
import type { LoadingParameters } from "#/common";
import type { Voidable } from "#/utils";

import { getLogger, hledgerWebApi, makeApiRequest, settingsStore, withLocalStore } from "@/shared";

import type { TransactionDateGroups, TransactionUniqueMonth } from "./models";

import { collectUniqueMonths, groupTransactionsByDay } from "../lib";

export type TransactionsStoreState = {
	transactions: TransactionsResponse;
	transactionsCount: number;
	transactionsGroups: TransactionDateGroups;
	transactionsUniqueMonths: TransactionUniqueMonth[];
};

export type TransactionsStoreActions = {
	loadTransactions: (parameters?: LoadingParameters) => Promise<Voidable<true>>;
};

export type TransactionsStore = {
	actions: TransactionsStoreActions;
	state: TransactionsStoreState;
};

const logger = getLogger("Transactions Store");

const createTransactionsStore = (): TransactionsStore => {
	let [state, setState] = createStore<TransactionsStoreState>({
		transactions: [],
		transactionsCount: 0,
		transactionsGroups: {},
		transactionsUniqueMonths: [],
	});

	let actions: TransactionsStoreActions = {
		loadTransactions: async (parameters) => {
			return makeApiRequest({
				onRequestError: (errorData) => {
					logger.error("Failed to load transactions.");

					throw errorData;
				},
				request: async () => {
					let transactions = await hledgerWebApi.getTransactions();
					let transactionsGroups = groupTransactionsByDay(transactions);
					let transactionsUniqueMonths = collectUniqueMonths(transactions);

					setState({
						transactions,
						transactionsCount: transactions.length,
						transactionsGroups,
						transactionsUniqueMonths,
					});
				},
				...(parameters?.loader && {
					setLoading: settingsStore.actions.setGlobalLoading(parameters.loader),
				}),
			});
		},
	};

	return {
		actions,
		state,
	};
};

export const [useTransactionsStore, withTransactionsStore] = withLocalStore<TransactionsStore>(createTransactionsStore);
