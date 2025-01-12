import { DateTime } from "luxon";

import { always, chain, descend, filter, ifElse, isNil, map, pipe, prop, reduce, sort, toPairs } from "ramda";

import type { TransactionUniqueMonth } from "@/entities";
import type { Posting, Transaction } from "#/api";
import type { Nullable } from "#/utils";

import { getTransactionDate, isIncomingTransaction, isSpendingTransaction, parseUniqueMonth } from "@/entities";
import { env } from "@/shared";

import { TransactionType } from "../model/models";

export type DataDescription = {
	commodity: string;
	date: string;
	description: string;
	value: number;
};

export type LabelledData = {
	commodities: string[];
	data: number[];
	labels: string[];
	ptransactions_: DataDescription[][];
};

const TransactionPrefix = {
	[TransactionType.EXPENSES]: "expenses:",
	[TransactionType.INCOMES]: "income:",
};

const TransactionFilter = {
	[TransactionType.EXPENSES]: isSpendingTransaction,
	[TransactionType.INCOMES]: isIncomingTransaction,
};

const filterByMonth = (monthDate: DateTime) => (transaction: Transaction) => {
	return getTransactionDate(transaction).hasSame(monthDate, "month");
};

export const getMonthData = (
	transactions: Transaction[],
	month: Nullable<TransactionUniqueMonth>,
	type: TransactionType,
) => {
	let monthDate: DateTime = ifElse(isNil, always(DateTime.now()), parseUniqueMonth)(month as string);

	return pipe(filter(TransactionFilter[type]), filter(filterByMonth(monthDate)))(transactions);
};

type Accumulator = Record<string, { commodity: string; ptransactions_: DataDescription[]; value: number }>;

export const getLabelledData = (transactionsInMonth: Transaction[], type: TransactionType) => {
	return pipe(
		chain((transaction: Transaction) => {
			return transaction.tpostings.filter((posting) => {
				return posting.paccount.startsWith(TransactionPrefix[type]);
			});
		}),
		map(({ paccount, pamount, ptransaction_ }: Posting) => {
			let [, label] = paccount.split(":");
			let commodity = pamount[0].acommodity;
			let value = pamount[0].aquantity.floatingPoint;

			return { commodity, label, ptransaction_, value };
		}),
		reduce((accumulator: Accumulator, { commodity, label, ptransaction_, value }) => {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (!accumulator[label]) {
				accumulator[label] = { commodity, ptransactions_: [], value: 0 };
			}

			accumulator[label].value += Math.abs(value);

			let transaction = transactionsInMonth.find((t) => t.tindex.toString() === ptransaction_);

			if (transaction) {
				accumulator[label].ptransactions_.push({
					commodity,
					date: transaction.tdate,
					description: transaction.tdescription,
					value,
				});
			}

			return accumulator;
		}, {} as Accumulator),
		pipe(
			toPairs,
			map(([label, { commodity, ptransactions_, value }]) => ({ commodity, label, ptransactions_, value })),
			sort(descend(prop("value"))),
		),
		(sortedData) => ({
			commodities: map(prop("commodity"), sortedData),
			data: map(prop("value"), sortedData),
			labels: map(prop("label"), sortedData),
			ptransactions_: map(prop("ptransactions_"), sortedData),
		}),
	)(transactionsInMonth);
};

export const generateColors = (count: number): string[] => {
	let palette = [
		env.getCssVariable("--accent1"),
		env.getCssVariable("--accent2"),
		env.getCssVariable("--accent3"),
		env.getCssVariable("--accent4"),
		env.getCssVariable("--accent5"),
		env.getCssVariable("--accent6"),
	];

	let colors: string[] = [];

	for (let index = 0; index < count; index++) {
		colors.push(palette[index % palette.length] || palette[0]);
	}

	return colors;
};
