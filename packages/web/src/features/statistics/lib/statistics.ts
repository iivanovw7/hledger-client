import { DateTime } from "luxon";

import { always, chain, descend, filter, ifElse, isNil, map, pipe, prop, reduce, sort, toPairs } from "ramda";

import type { TransactionUniqueMonth } from "@/entities";
import type { Posting, Transaction } from "#/api";
import type { AnyObject, Nullable } from "#/utils";
import type { ChartData, ChartOptions } from "chart.js";

import { getTransactionDate, isSpendingTransaction, parseUniqueMonth } from "@/entities";
import { env } from "@/shared";

const generateColors = (count: number): string[] => {
	let palette = ["#ff6188", "#fc9867", "#ffd866", "#a9dc76", "#78dce8", "#ab9df2"];
	let colors: string[] = [];

	for (let index = 0; index < count; index++) {
		colors.push(palette[index % palette.length] || palette[0]);
	}

	return colors;
};

const filterByMonth = (monthDate: DateTime) => (transaction: Transaction) => {
	return getTransactionDate(transaction).hasSame(monthDate, "month");
};

type Accumulator = Record<string, { commodity: string; value: number }>;

export type BarChartData = ChartData<"bar", number[], string>;
export type BarChartOptions = ChartOptions<"bar">;

export type BarChartLabelledData = {
	commodities: string[];
	data: number[];
	labels: string[];
};

export type MonthChartData = {
	commodities: string[];
	data: Nullable<BarChartData>;
	options: Nullable<BarChartOptions>;
};

export const getBarChartDataOptions = (labelledData: BarChartLabelledData): Nullable<BarChartOptions> => {
	let getLabelsFormatter = (value: number, context: AnyObject) => {
		return `${labelledData.commodities[context.dataIndex]} ${value.toFixed(2)}`;
	};

	let getTooltipFormatter = (context: AnyObject) => {
		return `${context.dataset.label || ""}: ${context.raw} (${context.label})`;
	};

	let labelColor = env.getCssVariable("--chart-label-color");
	let gridColor = env.getCssVariable("--chart-grid-color");

	return {
		indexAxis: "y",
		layout: {
			padding: {
				bottom: 10,
				right: 50,
				top: 10,
			},
		},
		maintainAspectRatio: false,
		plugins: {
			datalabels: {
				align: "right",
				anchor: "end",
				clip: false,
				color: labelColor,
				font: {
					size: 12,
				},
				formatter: getLabelsFormatter,
			},
			legend: {
				display: false,
			},
			tooltip: {
				callbacks: {
					label: getTooltipFormatter,
				},
			},
		},
		responsive: true,
		scales: {
			x: {
				beginAtZero: true,
				grid: {
					color: gridColor,
					drawOnChartArea: true,
				},
				ticks: {
					color: labelColor,
					precision: 0,
				},
			},
			y: {
				grid: {
					color: gridColor,
					drawOnChartArea: true,
				},
				offset: true,
				ticks: {
					autoSkip: false,
					color: labelColor,
				},
			},
		},
	};
};

export const getBarChartLabelledData = (transactionsInMonth: Transaction[]) => {
	return pipe(
		chain((transaction: Transaction) => {
			return transaction.tpostings.filter((posting) => {
				return posting.paccount.startsWith("expenses:");
			});
		}),
		map(({ paccount, pamount }: Posting) => {
			let [, label] = paccount.split(":");
			let commodity = pamount[0].acommodity;
			let value = pamount[0].aquantity.floatingPoint;

			return { commodity, label, value };
		}),
		reduce((accumulator: Accumulator, { commodity, label, value }) => {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (!accumulator[label]) {
				accumulator[label] = { commodity, value: 0 };
			}

			accumulator[label].value += value;

			return accumulator;
		}, {} as Accumulator),
		pipe(
			toPairs,
			map(([label, { commodity, value }]) => ({ commodity, label, value })),
			sort(descend(prop("value"))),
		),
		(sortedData) => ({
			commodities: map(prop("commodity"), sortedData),
			data: map(prop("value"), sortedData),
			labels: map(prop("label"), sortedData),
		}),
	)(transactionsInMonth);
};

export const getMonthChartData = (
	transactions: Transaction[],
	month: Nullable<TransactionUniqueMonth>,
): MonthChartData => {
	let monthDate: DateTime = ifElse(isNil, always(DateTime.now()), parseUniqueMonth)(month as string);
	let transactionsInMonth = pipe(filter(isSpendingTransaction), filter(filterByMonth(monthDate)))(transactions);
	let labelledData: BarChartLabelledData = getBarChartLabelledData(transactionsInMonth);

	return {
		commodities: labelledData.commodities,
		data: {
			datasets: [
				{
					backgroundColor: generateColors(labelledData.data.length),
					borderWidth: 1,
					data: labelledData.data,
					label: "Expenses",
				},
			],
			labels: labelledData.labels,
		},
		options: getBarChartDataOptions(labelledData),
	};
};
