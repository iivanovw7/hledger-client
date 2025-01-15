import { Bar } from "solid-chartjs";

import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { useTransactionsStore } from "@/entities";
import { bem } from "@/shared";

import type { MonthChartData } from "../lib";

import { getMonthChartData } from "../lib";
import { useStatisticsStore } from "../model";
import { TransactionType } from "../model/models";
import { StatisticsChartHeader } from "./statistics-chart-header";

import css from "./statistics-chart.module.scss";

const { cls } = bem(css);

export type StatisticsChartProperties = {
	type: TransactionType;
};

const INITAL_MONTH_CHART_DATA: MonthChartData = {
	commodities: [],
	data: null,
	options: null,
	total: 0,
};

export const StatisticsChart: Component<StatisticsChartProperties> = (properties) => {
	let { state } = useStatisticsStore();
	let { state: transactionsState } = useTransactionsStore();

	let [chartData, setChartData] = createSignal<Record<TransactionType, MonthChartData>>({
		[TransactionType.EXPENSES]: INITAL_MONTH_CHART_DATA,
		[TransactionType.INCOMES]: INITAL_MONTH_CHART_DATA,
	});

	onMount(() => {
		Chart.register(...registerables, ChartDataLabels);
	});

	createEffect(() => {
		setChartData({
			[TransactionType.EXPENSES]: getMonthChartData(
				transactionsState.transactions,
				state.chartSetting.Monthly,
				TransactionType.EXPENSES,
			),
			[TransactionType.INCOMES]: getMonthChartData(
				transactionsState.transactions,
				state.chartSetting.Monthly,
				TransactionType.INCOMES,
			),
		});
	});

	return (
		<div class={cls.statisticsChart.block()}>
			{!!chartData()[properties.type].total && (
				<StatisticsChartHeader
					commodity={chartData()[properties.type].commodities.at(0) || ""}
					expences={chartData()[TransactionType.EXPENSES].total}
					incomes={chartData()[TransactionType.INCOMES].total}
				/>
			)}
			{!!chartData()[properties.type].data?.labels?.length && chartData()[properties.type].options ? (
				<Bar
					data={chartData()[properties.type].data}
					options={chartData()[properties.type].options}
					type="bar"
				/>
			) : (
				<div class={cls.statisticsChart.emptyData()}>
					<p>No data available to display</p>
				</div>
			)}
		</div>
	);
};
