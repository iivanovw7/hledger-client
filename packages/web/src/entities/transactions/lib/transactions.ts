import { DateTime } from "luxon";

import { defaultTo, descend, groupBy, map, pipe, sort } from "ramda";

import type { Transaction } from "#/api";

import type { TransactionDateGroups } from "../model/models";

const getTransactionDate = (transaction: Transaction): DateTime => {
	return DateTime.fromISO(transaction.tdate);
};

const sortByRecentDate = sort(descend((transaction: Transaction) => getTransactionDate(transaction).toMillis()));

const getISODate = (transaction: Transaction) => {
	return getTransactionDate(transaction).toISODate() || "";
};

const groupByDay = (transactions: Transaction[]): TransactionDateGroups => {
	return map(defaultTo([]), groupBy(getISODate)(transactions)) as TransactionDateGroups;
};

export const goupTransactionsByDay = pipe(sortByRecentDate, groupByDay);
