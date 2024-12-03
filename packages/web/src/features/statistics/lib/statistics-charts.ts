import { sum } from "ramda";

import type { ChartData, ChartOptions } from "chart.js";

import type { TransactionUniqueMonth } from "@/entities";
import type { Transaction } from "#/api";
import type { AnyObject, Nullable } from "#/utils";

import { env } from "@/shared";

import type { LabelledData } from "./statistics";

import { generateColors, getLabelledData, getMonthData } from "./statistics";

export type BarChartData = ChartData<"bar", number[], string>;
export type BarChartOptions = ChartOptions<"bar">;

export type MonthChartData = {
	commodities: string[];
	data: Nullable<BarChartData>;
	options: Nullable<BarChartOptions>;
	total: number;
};

export const getBarChartDataOptions = (labelledData: LabelledData): Nullable<BarChartOptions> => {
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

export const getMonthChartData = (
	transactions: Transaction[],
	month: Nullable<TransactionUniqueMonth>,
): MonthChartData => {
	let transactionsInMonth = getMonthData(transactions, month);
	let labelledData = getLabelledData(transactionsInMonth);

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
		total: sum(labelledData.data),
	};
};
