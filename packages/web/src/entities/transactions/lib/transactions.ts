import { DateTime } from "luxon";

import { defaultTo, descend, groupBy, map, pipe, prop, sort, uniq } from "ramda";

import type { Transaction } from "#/api";

import type { TransactionDateGroups } from "../model/models";

export const getTransactionDate = (transaction: Transaction): DateTime => {
	return DateTime.fromISO(transaction.tdate);
};

export const sortByRecentDate = sort(descend<Transaction>(prop("tindex")));

export const getISODate = (transaction: Transaction) => {
	return getTransactionDate(transaction).toISODate() || "";
};

const groupByDay = (transactions: Transaction[]): TransactionDateGroups => {
	return map(defaultTo([]), groupBy(getISODate)(transactions)) as TransactionDateGroups;
};

export const groupTransactionsByDay = pipe(sortByRecentDate, groupByDay);

const formatMonthYear = (date: string): string => {
	return DateTime.fromISO(date).toFormat("MMMM yyyy");
};

export const collectUniqueMonths = pipe(
	map<Transaction, string>(prop("tdate")),
	map(formatMonthYear),
	uniq,
	sort((a, b) => {
		let aDate = DateTime.fromFormat(a, "MMMM yyyy");
		let bDate = DateTime.fromFormat(b, "MMMM yyyy");

		return aDate.toMillis() - bDate.toMillis();
	}),
);

export const parseUniqueMonth = (month: string) => {
	return DateTime.fromFormat(month, "MMMM yyyy");
};

export const filterByAccountName = (
	transactions: Transaction[],
	accountName: string,
): [Transaction[], Map<string, number>] => {
	let sorted = sortByRecentDate(transactions).reverse();
	let accumulator = 0;
	let accumulatedFilteredAmounts = new Map<string, number>();

	let filtered = sorted.filter((transaction) => {
		return transaction.tpostings.some((posting, index) => {
			let isMatch = posting.paccount === accountName;

			if (isMatch) {
				accumulator += posting.pamount[0].aquantity.floatingPoint || 0;
				accumulatedFilteredAmounts.set(`${transaction.tindex}.${index}`, accumulator);
			}

			return isMatch;
		});
	});

	return [filtered, accumulatedFilteredAmounts];
};
