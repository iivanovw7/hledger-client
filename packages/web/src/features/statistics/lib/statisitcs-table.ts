import { sum } from "ramda";

import type { TransactionUniqueMonth } from "@/entities";
import type { Transaction } from "#/api";
import type { Nullable } from "#/utils";

import { reduceIndexed } from "@/shared";

import type { DataDescription } from "./statistics";

import { generateColors, getLabelledData, getMonthData } from "./statistics";

export type MonthTableAccountData = {
	color: string;
	commodity: string;
	label: string;
	percentage: number;
	ptransactions: DataDescription[];
	value: number;
};

export type MonthTableData = {
	data: MonthTableAccountData[];
	total: number;
};

export const getMonthTableData = (
	transactions: Transaction[],
	month: Nullable<TransactionUniqueMonth>,
): MonthTableData => {
	let transactionsInMonth = getMonthData(transactions, month);
	let labelledData = getLabelledData(transactionsInMonth);
	let total = sum(labelledData.data);
	let colors = generateColors(labelledData.labels.length);

	let tableData = reduceIndexed(
		(accumulator: MonthTableAccountData[], data: number, index: number) => {
			accumulator.push({
				color: colors[index || 0],
				commodity: labelledData.commodities[index] || "",
				label: labelledData.labels[index] || "unknown",
				percentage: (data / total) * 100,
				ptransactions: labelledData.ptransactions_[index],
				value: data,
			});

			return accumulator;
		},
		[],
		labelledData.data,
	);

	return {
		data: tableData,
		total,
	};
};
