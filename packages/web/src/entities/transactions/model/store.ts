import type { TransactionsResponse } from "#/api";
import type { LoadingParameters } from "#/common";
import type { Nullable, Voidable } from "#/utils";

import { getLogger, hledgerWebApi, makeApiRequest, settingsStore, withLocalStore } from "@/shared";

import type { TransactionDateGroups, TransactionUniqueMonth } from "./models";

import { collectUniqueMonths, filterByAccountName, groupTransactionsByDay } from "../lib";

export type TransactionsStoreState = {
	accumulatedFilteredAmounts: Map<string, number>;
	filter: string;
	transactions: TransactionsResponse;
	transactionsCount: number;
	transactionsGroups: TransactionDateGroups;
	transactionsUniqueMonths: TransactionUniqueMonth[];
};

export type TransactionsStoreActions = {
	loadTransactions: (parameters?: LoadingParameters) => Promise<Voidable<true>>;
	setFilter: (filter: Nullable<string>) => void;
};

export type TransactionsStore = {
	actions: TransactionsStoreActions;
	state: TransactionsStoreState;
};

const logger = getLogger("Transactions Store");

const createTransactionsStore = (): TransactionsStore => {
	let [state, setState] = createStore<TransactionsStoreState>({
		accumulatedFilteredAmounts: new Map<string, number>(),
		filter: "",
		transactions: [],
		transactionsCount: 0,
		transactionsGroups: {},
		transactionsUniqueMonths: [],
	});

	let setTransactionsList = (transactions: TransactionsResponse, filter?: string) => {
		let filteredTransactions: TransactionsResponse = [];
		let accumulatedFilteredAmounts = new Map<string, number>();

		if (filter) {
			let [filtered, amounts] = filterByAccountName(transactions, filter);

			filteredTransactions = filtered;
			accumulatedFilteredAmounts = amounts;
		} else {
			filteredTransactions = transactions;
		}

		let transactionsGroups = groupTransactionsByDay(filteredTransactions);

		setState({
			accumulatedFilteredAmounts,
			transactions,
			transactionsCount: transactions.length,
			transactionsGroups,
			transactionsUniqueMonths: collectUniqueMonths(transactions),
		});
	};

	let actions: TransactionsStoreActions = {
		loadTransactions: async (parameters) => {
			return makeApiRequest({
				onRequestError: (errorData) => {
					logger.error("Failed to load transactions.");

					throw errorData;
				},
				request: async () => {
					setState("filter", "");
					setTransactionsList(await hledgerWebApi.getTransactions());
				},
				...(parameters?.loader && {
					setLoading: settingsStore.actions.setGlobalLoading(parameters.loader),
				}),
			});
		},
		setFilter: (filter) => {
			setState("filter", filter || "");
			setTransactionsList(state.transactions, filter || "");
		},
	};

	return {
		actions,
		state,
	};
};

export const [useTransactionsStore, withTransactionsStore] = withLocalStore<TransactionsStore>(createTransactionsStore);
